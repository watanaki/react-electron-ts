$distFolders = @("dist", "dist-electron", "dist-react");
$currentFolder = Get-Location;

foreach ($folder in $distFolders) {
  $path = Join-Path -Path $currentFolder -ChildPath $folder;
  if (Test-Path -Path $path -PathType Container) {
    Remove-Item -Path $path -Recurse -Force;
    Write-Host "Folder deleted: $path";
  }
  else {
    Write-Host "Folder not exists: $path";
  }
}


