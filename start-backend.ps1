$ErrorActionPreference = "Stop"

# 配置路径
$JdkPath = "C:\Users\wang\.antigravity\extensions\redhat.java-1.52.0-win32-x64\jre\21.0.9-win32-x86_64"
$MavenVersion = "3.9.6"
$MavenUrl = "https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/$MavenVersion/binaries/apache-maven-$MavenVersion-bin.zip"
$ToolsDir = Join-Path $PSScriptRoot "tools"
$MavenDir = Join-Path $ToolsDir "apache-maven-$MavenVersion"

# 1. 检查并设置 JAVA_HOME
Write-Host "Checking JDK..."
if (Test-Path $JdkPath) {
    $env:JAVA_HOME = $JdkPath
    $env:Path = "$JdkPath\bin;" + $env:Path
    Write-Host "Using JDK at: $JdkPath"
    & java -version
} else {
    Write-Error "JDK not found at $JdkPath. Please install Java 17+ manually."
    exit 1
}

# 2. 检查并下载 Maven
if (-not (Test-Path $ToolsDir)) {
    New-Item -ItemType Directory -Force -Path $ToolsDir | Out-Null
}

if (-not (Test-Path $MavenDir)) {
    Write-Host "Downloading Maven $MavenVersion..."
    $ZipPath = Join-Path $ToolsDir "maven.zip"
    Invoke-WebRequest -Uri $MavenUrl -OutFile $ZipPath
    
    Write-Host "Extracting Maven..."
    Expand-Archive -Path $ZipPath -DestinationPath $ToolsDir -Force
    Remove-Item $ZipPath
}

$MavenBin = Join-Path $MavenDir "bin"
$env:Path = "$MavenBin;" + $env:Path

Write-Host "Using Maven at: $MavenBin"
& mvn -version

# 3. 编译并运行项目
$ServerDir = Join-Path $PSScriptRoot "server"
if (Test-Path $ServerDir) {
    Set-Location $ServerDir
    Write-Host "Building project..."
    & mvn clean install -DskipTests
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Starting Spring Boot application..."
        & mvn spring-boot:run
    } else {
        Write-Error "Build failed."
    }
} else {
    Write-Error "Server directory not found at $ServerDir"
}
