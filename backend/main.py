
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import HTTPException

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

lists = [
    
]


class ListsCreate(BaseModel):
    tasks: str
    activity: bool = False


@app.get("/")
def home():
    return {"message": "Welcome to Smart Inventory"}


@app.get("/lists")
def get_todos():
    return lists




@app.post("/lists")
def add_todos(item: ListsCreate):
    new_item = {
        "id":max((work["id"] for work in lists),default=0)+1,
        "tasks": item.tasks,
        "activity": item.activity,
    }

    lists.append(new_item)
    return new_item

class PutTodo(BaseModel):
    id:int
    
    
@app.get("/lists/{id}")
def get_todo(id: int):
    todo = next(
        (item for item in lists if item["id"] == id),
        None
    )

    if todo is None:
        raise HTTPException(status_code=404, detail="List item not found")

    return todo


class PutTodoo(BaseModel):
    tasks:str
    
    
@app.put("/lists/{id}")
def put_todo(id: int, item: PutTodoo):
    for work in lists:
        if work["id"] == id:
            work["tasks"] = item.tasks
            return work

    raise HTTPException(
        status_code=404,
        detail="List item not found"
    )
    
@app.delete("/lists/{id}")
def delete_todo(id: int):
    for work in lists:
        if work["id"] == id:
            lists.remove(work)
            return {
                "message": "Todo deleted successfully",
                "deleted": work
            }

    raise HTTPException(
        status_code=404,
        detail="List item not found"
    )
    
    
class UPADATEACT(BaseModel):
    activity:bool
    
@app.patch("/lists/{id}") 
def update_activity(id:int,item:UPADATEACT):
    for work in lists:
        if work["id"]==id:
            work["activity"]=item.activity
            return work
        
    raise HTTPException(status_code=404, detail="Todo not found")    
    

    
