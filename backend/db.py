from sqlalchemy import create_engine, String, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship, Mapped, mapped_column
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv('DB_URL')

engine = create_engine(DB_URL)

SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    username:Mapped[str] = mapped_column(String(50))
    email: Mapped[str] = mapped_column()
    password: Mapped[str | None] = mapped_column(nullable=True)
    provider: Mapped[str] = mapped_column()
    provider_id: Mapped[str] = mapped_column()

    contact = relationship('Contact', back_populates='user', cascade='all, delete-orphan')

class Contact(Base):
    __tablename__ = 'contact'

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column()
    last_name: Mapped[str] = mapped_column()
    phone: Mapped[int] = mapped_column()
    email: Mapped[str] = mapped_column()
    owner_id: Mapped[int] = mapped_column(ForeignKey('users.id'))

    user = relationship('User', back_populates='contact')



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
