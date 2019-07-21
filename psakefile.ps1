Task Publish -Depends Pack {
    Exec { docker login docker.io  --username=ashotnazaryan45 }
    $remoteTag = "docker.io/$script:latestImageTag"
    Exec { docker tag $script:latestImageTag $remoteTag }
    Exec { docker push $remoteTag }
}

Task Pack -Depends Build {
    Exec { docker build -f Dockerfile $script:SourceRootFolder -t $script:latestImageTag }
}

Task Build -Depends Init, Clean {
    try {
        Push-Location
        Set-Location $script:SourceRootFolder
        Exec { npm install $script:SourceRootFolder }
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