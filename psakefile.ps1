Task Publish -Depends Pack {
   Exec { docker login docker.io  --username=ashotnazaryan }
   $remoteTag = "docker.io/$script:latestImageTag"
   Exec { docker tag $script:latestImageTag $remoteTag }
   Exec { docker push $remoteTag }
}

Task Pack -Depends Build {
   $src = (Resolve-Path ".\ui\").Path
   Exec { docker build -f Dockerfile $src -t $script:latestImageTag }
}

Task Build -Depends Init,Clean {
   #
}

Task Clean -Depends Init {
}

Task Init {
   $date = Get-Date
   $ticks = $date.Ticks
   $script:latestImageTag = "ashotnazaryan/lionize-web-ui:latest"
   $trashFolder = Join-Path -Path . -ChildPath ".trash"
   $script:trashFolder = Join-Path -Path $trashFolder -ChildPath $ticks.ToString("D19")
   New-Item -Path $script:trashFolder -ItemType Directory
   $script:trashFolder = Resolve-Path -Path $script:trashFolder
}