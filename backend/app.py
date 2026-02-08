from fastapi import FastAPI,Depends,HTTPException
from sqlalchemy.orm import Session
from schema import Todo as TodoSchema,TodoCreate
from database import sessionLocal,Base,engine
from models import Todo
Base.metadata.create_all(bind=engine)
app = FastAPI()
def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@app.post("/",response_model=TodoSchema)
def create(todo:TodoCreate, db:Session = Depends(get_db)):
    db_todo = Todo(**todo.dict())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo
#read
@app.get("/todos",response_model=list[TodoSchema])
def read_todos(db:Session = Depends(get_db)):
    return db.query(Todo).all()
#read single data

@app.get("/todos/{todo_id}",response_model=TodoSchema)
def single_read(todo_id:int,db:Session=Depends(get_db)):
    todo=db.query(Todo).filter(todo_id == Todo.id).first()
    if not todo:
        raise HTTPException(status_code=404,detail="not found id no")
    return todo
#update
@app.put("/todos/{todo_id}", response_model=TodoSchema)
def update_todo(todo_id: int, updated: TodoCreate, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(todo_id == Todo.id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    for key, value in updated.dict().items():
        setattr(todo, key, value)
    db.commit()
    db.refresh(todo)
    return todo

#delete
@app.delete("/todos/{todo_id}",response_model=TodoSchema)
def delete(todo_id:int,db:Session = Depends(get_db)):
    todo=db.query(Todo).filter(todo_id==Todo.id).first()
    if not todo:
        raise HTTPException(status_code=404,detail="id not found")
    db.delete(todo)
    db.commit()
    return {"message":"deleted successfully"}
