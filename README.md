# sbf-backend
Backend for upcoming study buddy finding website
# API Endpoints
## Courses Endpoints
### Fetching Available Courses
**Request Format:** `api/courses`
**Request Type:** `GET`
**Returned Data Format:** JSON
**Description:** This endpoint reaches to the database and retrieves all existent courses.
**Example Request:** `api/courses`
**Example Output:**

```
{
	"courses" : [
		{
			"sid" : "1",
			"subject_name" : "CSE154"
		},
		{
			"sid" : "2",
			"subject_name" : "CSE666"
		},
	. . .
	]
}
```
