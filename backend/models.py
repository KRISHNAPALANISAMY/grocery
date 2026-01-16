from database import Base
from sqlalchemy import Column,Integer,String,Primary_key,Boolean
class Todo(Base):
    __tablename__ = 'todo'
    id = Column(Integer,Primary_key,index=True)
    title = Column(String,nullable=False)
    description = Column(String)
    completed= Column(Boolean,default=False)