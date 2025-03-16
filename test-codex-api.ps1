# PowerShell script to test Codex.io GraphQL API

# The API key from your command
$apiKey = "M22c98e492fc97424434dcb07700b8704ec4276c1"

# Try different authorization formats
$authFormats = @(
    $apiKey,                     # Raw API key
    "Bearer $apiKey",            # Bearer token format
    "Token $apiKey",             # Token format
    "ApiKey $apiKey"             # ApiKey format
)

$body = @{
    query = "{ getNetworks { name, id } }"
} | ConvertTo-Json

foreach ($authValue in $authFormats) {
    Write-Host "`n`nTrying authorization format: $authValue"
    
    $headers = @{
        "Content-Type" = "application/json"
        "Authorization" = $authValue
    }
    
    try {
        $response = Invoke-WebRequest -Uri "https://graph.codex.io/graphql" -Method POST -Headers $headers -Body $body
        
        Write-Host "Status Code: $($response.StatusCode)"
        Write-Host "Response Body:"
        $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
        
        # If successful, break out of the loop
        if ($response.StatusCode -eq 200) {
            $responseJson = $response.Content | ConvertFrom-Json
            if (-not $responseJson.errors) {
                Write-Host "Success with format: $authValue"
                break
            }
        }
    } catch {
        Write-Host "Error occurred: $_"
        Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)"
        
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $reader.BaseStream.Position = 0
            $reader.DiscardBufferedData()
            $responseBody = $reader.ReadToEnd()
            Write-Host "Response Body: $responseBody"
        }
    }
} 