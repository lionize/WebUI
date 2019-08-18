Properties {
    $VersionTags = @()

    if($Latest) {
        $VersionTags += 'latest'
    }

    if(!!($Version)) {
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
    $remoteTag = "docker.io/$script:latestImageTag"
    Exec { docker tag $script:latestImageTag $remoteTag }
    Exec { docker push $remoteTag }
}

Task Pack -Depends CopyArtefacts {
    Exec { docker build -f Dockerfile $script:artefacts -t $script:latestImageTag }
}

Task CopyArtefacts -Depends Build {
    $script:artefacts = Join-Path -Path $trashFolder -ChildPath "artefacts"

    Copy-Item -Path (Join-Path -Path $SourceRootFolder -ChildPath ".\dist\lionize") -Destination (Join-Path -Path $script:artefacts -ChildPath "build") -Recurse
    Copy-Item -Path (Join-Path -Path $SourceRootFolder -ChildPath "nginx.conf") -Destination (Join-Path -Path $script:artefacts -ChildPath "nginx.conf")
}

Task Build -Depends TranspileModels {
    try {
        Push-Location
        Set-Location $SourceRootFolder
        Exec { npm run "build:prod" }
    }
    finally {
        Pop-Location
    }
}

Task TranspileModels -Depends NpmInstall {
    $inputFile = Resolve-Path ".\ui\ApiModels.yml"
    $outputFolder = Resolve-Path -Path ".\ui\src\app\shared\models"
    Exec { smite --input-file "$inputFile" --lang typescript --output-folder "$outputFolder" }
}

Task NpmInstall -Depends Init, Clean {
    try {
        Push-Location
        Set-Location $SourceRootFolder
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
    $trashFolder = Join-Path -Path . -ChildPath ".trash"
    $trashFolder = Join-Path -Path $trashFolder -ChildPath $ticks.ToString("D19")
    New-Item -Path $trashFolder -ItemType Directory
    $trashFolder = Resolve-Path -Path $trashFolder
    $SourceRootFolder = (Resolve-Path ".\ui\").Path
}