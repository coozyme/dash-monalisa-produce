# STANDAR API

{root.api}/{grouping}{version}/{subGrouping}/{endpoint}

SAMPLE
> api.masjid-nuruljannah/auth/v0/user/login

### Standar Status Response

```
200 - OK                         -> Call API Success
201 - POST                       -> Success
400 - BAD REQUEST                -> Error ib Client Side (Bisa input yang salah dll)
401 - UNAUTHORIZED               -> User not authorizes to access
403 - FORBIDDEN                  -> User not allowed to access
404 - NOT FOUND                  -> Request Endpoint Not Found
500 - INTERNAL, SERVER ERROR     -> Error on Server Side
```

***

#### GROUP : AUTHENTICATION

- Register

> api.masjid-nuruljannah/auth/v0/user/register

```
request:
   {
      nama : "Ary Setya Pambudi",
      email: "programmeranak@gmail.com",
      password : "ahsiudweqwe"
   }
```

- Login

> api.masjid-nuruljannah/auth/v0/user/login

```
request:
   {
      email : "programmeranak@gmail.com",
      password : "asgduiasdasd"
   }
```

***
***

#### GROUP : BLOGGING

- Create Blog Post

> api.masjid-nuruljannah/auth/v0/blog/create-blog

```
request:
   {
      title : "Security Notes",
      Thumbnail : "thumbnail-image1.jpg"
      description : "Focusing analist web security" 
   }
```

- Get All Blog

> api.masjid-nuruljannah/blog/v0/blogs/

```
request:
   {
      email : "programmeranak@gmail.com",
      password : "asgduiasdasd"
   }
```

- Delete Blog by Id

> api.masjid-nuruljannah/blog/v0/blogs/delete-blogid?{ID}

```
request:
   {
      id : 2
   }
```

- Update Blog by Id

> api.masjid-nuruljannah/blog/v0/blogs/update/id?{ID}

```
request:
   {
      title : "Security Notes",
      Thumbnail : "thumbnail-image1.jpg"
      description : "Focusing analist web security" 
   }
```

***
