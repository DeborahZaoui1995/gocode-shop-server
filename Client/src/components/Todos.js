import Todo from "./Todo";

function Todos({todos})
{
    return(
        <div className="Todos">
            
{
    todos.map((todo) => 
     
    <Todo key={todo.id} title={todo.title} />
    )
}
        </div>   
    )

}

export default Todos;