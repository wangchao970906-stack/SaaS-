$ErrorActionPreference = "Stop"

# 配置
$JdkPath = "D:\IDEA\JDK\jdk1.8.0_361"
$MavenVersion = "3.9.6"
# 备用下载源列表
$MavenUrls = @(
    "https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/$MavenVersion/binaries/apache-maven-$MavenVersion-bin.zip",
    "https://archive.apache.org/dist/maven/maven-3/$MavenVersion/binaries/apache-maven-$MavenVersion-bin.zip"
)
$ToolsDir = Join-Path $PSScriptRoot "tools"
$MavenDir = Join-Path $ToolsDir "apache-maven-$MavenVersion"
$ServerDir = Join-Path $PSScriptRoot "server"
$SettingsXml = Join-Path $ServerDir "settings.xml"

# 1. 设置 JAVA_HOME
Write-Host "Checking JDK..."
if (Test-Path $JdkPath) {
    $env:JAVA_HOME = $JdkPath
    $env:Path = "$JdkPath\bin;" + $env:Path
    & java -version
} else {
    Write-Error "JDK not found. Please check path."
    exit 1
}

# 2. 获取 Maven
if (-not (Test-Path $ToolsDir)) { New-Item -ItemType Directory -Force -Path $ToolsDir | Out-Null }

if (-not (Test-Path $MavenDir)) {
    $ZipPath = Join-Path $ToolsDir "maven.zip"
    
    foreach ($Url in $MavenUrls) {
        Write-Host "Trying to download Maven from $Url ..."
        try {
            # 尝试使用 curl (更可靠)
            Write-Host "Executing: curl -L -o $ZipPath $Url"
            & curl.exe -L -o "$ZipPath" "$Url" --connect-timeout 10 --retry 3
            
            if ($LASTEXITCODE -eq 0 -and (Test-Path $ZipPath) -and (Get-Item $ZipPath).Length -gt 1000000) {
                Write-Host "Download successful."
                break
            }
        } catch {
            Write-Warning "Curl failed, attempting PowerShell..."
        }
    }
    
    if (-not (Test-Path $ZipPath) -or (Get-Item $ZipPath).Length -lt 1000000) {
        Write-Error "Failed to download Maven. Please install manually."
        exit 1
    }

    Write-Host "Extracting Maven..."
    Expand-Archive -Path $ZipPath -DestinationPath $ToolsDir -Force
    Remove-Item $ZipPath
}

$MavenBin = Join-Path $MavenDir "bin"
$env:Path = "$MavenBin;" + $env:Path

Write-Host "Using Maven at: $MavenBin"
& mvn -version

# 3. 运行后端
if (Test-Path $ServerDir) {
    Set-Location $ServerDir
    
    # 尝试构建 - 方案 A: 使用阿里云镜像
    Write-Host "Building project (Try 1: Aliyun Mirror)..."
    & mvn clean install -DskipTests -s "$SettingsXml"
    
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Build with Aliyun mirror failed. Retrying with default Maven settings..."
        # 尝试构建 - 方案 B: 使用默认源
        & mvn clean install -DskipTests
    }

    if ($LASTEXITCODE -eq 0) {
        Write-Host "Starting Spring Boot application..."
        & mvn spring-boot:run
    } else {
        Write-Error "Build failed after refries. Please verify your network connection or try running in IntelliJ IDEA."
    }
} else {
    Write-Error "Server directory not found."
}
