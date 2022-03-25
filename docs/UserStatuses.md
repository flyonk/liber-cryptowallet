```mermaid
graph TD
    Guest -->|Fill OTP|Authenticated
    Authenticated -->|Fill FIO, Birthdate, Email|Registered
    Registered -->|KYC Approved|Active
    Registered -->|KYC Failed x3|Blocked
    Active -->|Closing profile from menu|Closed
    Closed
```
