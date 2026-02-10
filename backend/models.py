from pydantic import BaseModel, EmailStr
from pydantic_extra_types.phone_numbers import PhoneNumber


class RegisterUser(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginUser(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True

class CreateContact(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: EmailStr

class ContactUpdate(BaseModel):
    new_full_name: str | None = None
    new_phone: str | None = None
    new_email: EmailStr | None = None

class ContactResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    phone: str
    email: EmailStr
    owner_id: int

    class Config:
        orm_mode = True