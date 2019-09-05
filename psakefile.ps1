Properties {
    $VersionTags = @()

    if ($Latest) {
        $VersionTags += 'latest'
    }

    if (!!($Version)) {
        $Version = [Version]$Version

        Assert ($Version.Revision -eq -1) "Version should be formatted as Major.Minor.Patch like 1.2.3"
        Assert ($Version.Build -ne -1) "Version should be formatted as Major.Minor.Patch like 1.2.3"

        $Version = $Version.ToString()
        $VersionTags += $Version
    }

    Assert $VersionTags "No version parameter (latest or specific version) is passed."
}

Task Publish -Depends Pack {
    Exec { docker login docker.io  --username=ashotnazaryan45 }
    foreach ($VersionTag in $VersionTags) {
        $localTag = ($script:imageName + ":" + $VersionTag)
        $remoteTag = ("docker.io/" + $localTag)
        Exec { docker tag $localTag $remoteTag }
        Exec { docker push $remoteTag }
    }
}

Task Pack -Depends CopyArtefacts {
    $tagsArguments = @()
    foreach ($VersionTag in $VersionTags) {
        $tagsArguments += "-t"
        $tagsArguments += ($script:imageName + ":" + $VersionTag)
    }

    Exec { docker build -f Dockerfile $script:artefacts $tagsArguments }
}

Task CopyArtefacts -Depends Build {
    $script:artefacts = Join-Path -Path $script:trashFolder -ChildPath "artefacts"

    Copy-Item -Path (Join-Path -Path $script:SourceRootFolder -ChildPath ".\dist\lionize") -Destination (Join-Path -Path $script:artefacts -ChildPath "build") -Recurse
    Copy-Item -Path (Join-Path -Path $script:SourceRootFolder -ChildPath "nginx.conf") -Destination (Join-Path -Path $script:artefacts -ChildPath "nginx.conf")
}

Task Build -Depends TranspileModels {
    try {
        Push-Location
        Set-Location $script:SourceRootFolder
        Exec { npm run "build:prod" }
    }
    finally {
        Pop-Location
    }
}

Task TranspileModels -Depends NpmInstall {
    $models = @(
        @{InputFile = ".\ui\apis\habitica\ApiModels.yml"; OutputFolder = ".\ui\src\app\shared\models\habitica" },
        @{InputFile = ".\ui\apis\identity\ApiModels.yml"; OutputFolder = ".\ui\src\app\shared\models\identity" },
        @{InputFile = ".\ui\apis\tasks\ApiModels.yml"; OutputFolder = ".\ui\src\app\shared\models\tasks" }
    )

    foreach ($model in $models) {
        $inputFile = Resolve-Path $model.InputFile
        $outputFolder = Resolve-Path -Path $model.OutputFolder
        Exec { smite --input-file $inputFile --lang typescript --output-folder $outputFolder }
    }
}

Task NpmInstall -Depends Init, Clean {
    try {
        Push-Location
        Set-Location $script:SourceRootFolder
        Exec { npm install }
    }
    finally {
        Pop-Location
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