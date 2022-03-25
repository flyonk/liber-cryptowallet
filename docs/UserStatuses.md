## User Statuses

```mermaid
graph TD
    Guest -->|Fill OTP|Authenticated
    Authenticated -->|Fill FIO, Birthdate, Email|Registered
    Registered -->|KYC Approved|Active
    Registered -->|KYC Failed x3|Blocked
    Active -->|Closing profile from menu|Closed
    Closed
```

## KYC Statuses

```mermaid
graph TD
    A[Not started] -->|Claim request|B
    B[Pending] -->|KYC Failed|C
    B -->|KYC Passed|D
    C[Rejected] -->|Next try|B
    D[Success]
```
