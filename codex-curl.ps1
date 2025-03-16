# PowerShell script to query Codex.io GraphQL API using Invoke-RestMethod

# API key with angle brackets as in the original command
$apiKey = "<M22c98e492fc97424434dcb07700b8704ec4276c1>"

# Headers
$headers = @{
    "Content-Type" = "application/json"
    "Authorization" = $apiKey
}

# Query body
$body = '{ "query": "{ getNetworks { name, id } }" }'

Write-Host "Sending request to Codex.io GraphQL API..."
Write-Host "Using API key: $apiKey"

try {
    # Using Invoke-RestMethod which is similar to curl but native to PowerShell
    $response = Invoke-RestMethod -Uri "https://graph.codex.io/graphql" -Method POST -Headers $headers -Body $body -ContentType "application/json"
    
    # Output the response
    Write-Host "Response:"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error occurred: $_"
    
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "Status Code: $statusCode"
        
        # Get response body from the error
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd()
        
        Write-Host "Response Body: $responseBody"
    }
} 