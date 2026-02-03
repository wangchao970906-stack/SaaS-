$ErrorActionPreference = "Stop"
$JdkPath = "C:\Users\wang\.antigravity\extensions\redhat.java-1.52.0-win32-x64\jre\21.0.9-win32-x86_64"
$MavenVersion = "3.9.6"
$ToolsDir = Join-Path $PSScriptRoot "tools"
$MavenDir = Join-Path $ToolsDir "apache-maven-$MavenVersion"
$ServerDir = Join-Path $PSScriptRoot "server"
$SettingsXml = Join-Path $ServerDir "settings.xml"

if (Test-Path $JdkPath) {
    $env:JAVA_HOME = $JdkPath
    $env:Path = "$JdkPath\bin;" + $env:Path
}
$MavenBin = Join-Path $MavenDir "bin"
$env:Path = "$MavenBin;" + $env:Path

Set-Location $ServerDir
Write-Host "Running mvn clean compile..."
cmd /c "mvn clean compile -s $SettingsXml -e"
