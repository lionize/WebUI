Task Publish -Depends Pack {
    Exec { docker login docker.io  --username=ashotnazaryan45 }
    foreach ($VersionTag in $VersionTags) {
        $localTag = ($script:imageName + ":" + $VersionTag)
        $remoteTag = ("docker.io/" + $localTag)
        Exec { docker tag $localTag $remoteTag }
        Exec { docker push $remoteTag }

        try {
            Exec { keybase chat send --nonblock --private lionize "BUILD: Published $remoteTag" }
        }
        catch {
            Write-Warning "Failed to send notification"
        }
    }
}

Task Pack -Depends CopyArtefacts, EstimateVersions {
    $tagsArguments = @()
    foreach ($VersionTag in $VersionTags) {
        $tagsArguments += "-t"
        $tagsArguments += ($script:imageName + ":" + $VersionTag)
    }

    Exec { docker build -f Dockerfile $script:artefacts $tagsArguments }
}

Task EstimateVersions {
    $script:VersionTags = @()

    if ($Latest) {
        $script:VersionTags += 'latest'
    }

    if (!!($Version)) {
        $Version = [Version]$Version

        Assert ($Version.Revision -eq -1) "Version should be formatted as Major.Minor.Patch like 1.2.3"
        Assert ($Version.Build -ne -1) "Version should be formatted as Major.Minor.Patch like 1.2.3"

        $Version = $Version.ToString()
        $script:VersionTags += $Version
    }

    Assert $script:VersionTags "No version parameter (latest or specific version) is passed."
}

Task CopyArtefacts -Depends Build {
    $script:artefacts = Join-Path -Path $script:trashFolder -ChildPath "artefacts"

    Copy-Item -Path (Join-Path -Path $script:SourceRootFolder -ChildPath ".\dist\lionize") -Destination (Join-Path -Path $script:artefacts -ChildPath "build") -Recurse
    Copy-Item -Path (Join-Path -Path $script:SourceRootFolder -ChildPath "nginx.conf") -Destination (Join-Path -Path $script:artefacts -ChildPath "nginx.conf")
}

Task Build -Depends NpmInstall {
    try {
        Push-Location
        Set-Location $script:SourceRootFolder
        Exec { npm run "build:prod" }
    }
    finally {
        Pop-Location
    }
}

Task NpmInstall -Depends Init, Clean, TranspileModels {
    try {
        Push-Location
        Set-Location $script:SourceRootFolder
        Exec { npm install }
    }
    finally {
        Pop-Location
    }
}

Task TranspileModels -Depends Clean {
    $models = @(
        @{InputFile = "./ui/apis/habitica/ApiModels.yml"; OutputFolder = "./ui/src/app/shared/models/habitica" },
        @{InputFile = "./ui/apis/identity/ApiModels.yml"; OutputFolder = "./ui/src/app/shared/models/identity" },
        @{InputFile = "./ui/apis/tasks/ApiModels.yml"; OutputFolder = "./ui/src/app/shared/models/tasks" },
        @{InputFile = "./ui/apis/tasks/RealtimeModels.yml"; OutputFolder = "./ui/src/app/shared/models/tasks/realtime" }
    )

    foreach ($model in $models) {
        $inputFile = Resolve-Path $model.InputFile
        if (-not (Test-Path -Path $model.OutputFolder)) {
            New-Item -Path $model.OutputFolder -ItemType Directory | Out-Null
        }
        $outputFolder = Resolve-Path -Path $model.OutputFolder

        Exec { smite --input-file $inputFile --lang typescript --output-folder $outputFolder }
    }
}

Task Clean -Depends Init {
}

Task Init {
    $date = Get-Date
    $ticks = $date.Ticks
    $script:imageName = "ashotnazaryan45/lionize-web-ui"
    $script:trashFolder = Join-Path -Path . -ChildPath ".trash"
    $script:trashFolder = Join-Path -Path $script:trashFolder -ChildPath $ticks.ToString("D19")
    New-Item -Path $script:trashFolder -ItemType Directory
    $script:trashFolder = Resolve-Path -Path $script:trashFolder
    $script:SourceRootFolder = (Resolve-Path ".\ui\").Path
}