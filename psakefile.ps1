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
    $script:artefacts = Join-Path -Path $script:trashFolder -ChildPath "artefacts"

    Copy-Item -Path (Join-Path -Path $script:SourceRootFolder -ChildPath ".\dist\lionize") -Destination (Join-Path -Path $script:artefacts -ChildPath "build") -Recurse
    Copy-Item -Path (Join-Path -Path $script:SourceRootFolder -ChildPath "nginx.conf") -Destination (Join-Path -Path $script:artefacts -ChildPath "nginx.conf")
}

Task Build -Depends TranspileModels {
    try {
        Push-Location
        Set-Location $script:SourceRootFolder
        Exec { npm run build }
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
    $script:latestImageTag = "ashotnazaryan45/lionize-web-ui:latest"
    $trashFolder = Join-Path -Path . -ChildPath ".trash"
    $script:trashFolder = Join-Path -Path $trashFolder -ChildPath $ticks.ToString("D19")
    New-Item -Path $script:trashFolder -ItemType Directory
    $script:trashFolder = Resolve-Path -Path $script:trashFolder
    $script:SourceRootFolder = (Resolve-Path ".\ui\").Path
}