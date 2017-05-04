import ReactDOM from 'react-dom';
import React from 'react';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';


class SortableComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          items: [],
          inputText: "",
          descriptionText:"",
          userName:"",
        };
    }
    componentDidMount(){
        firebase.database().ref(this.props.status+"/").on("value", (snapshot)=>{
        const allTasks = snapshot.val()
            if (allTasks != null) {
                this.setState({
                    items: allTasks,
                })
            }
        })
    }
// componentDidUpdate(){
//     firebase.database().ref(this.props.status+"/").on("value", (snapshot)=>{
//     const update = snapshot.val()
//         if (update != null) {
//             this.setState({
//                 items: update,
//             })
//         }
//     })
// }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  }
  handleAddTask=(event)=>{
      event.preventDefault();
    //   const items = this.state.items.slice();
    //   items.push(this.state.inputText);
    //   console.log("nowa tablica to",items);
    //   this.setState({
    //       items: items,
    //       inputText: "",
    //   });
      const currentTask = {
          id: this.state.items.length,
          task: this.state.inputText,
          description: "description",
      }
    //   const status = this.props.status;
    //   console.log(status);
      firebase.database().ref(this.props.status+"/"+currentTask.id).set(currentTask)
      this.setState({
          inputText: "",
      });
    //   if (typeof this.props.onAdd === "function") {
    //       this.props.onAdd(items, this.props.status);
    //   }
  }
  handleEditTask=(event)=>{
      this.setState({
          inputText: event.target.value,
      });
  }
  handleEditDescription=(event)=>{
      console.log(event.target.value);
      this.setState({
          descriptionText: event.target.value,
      });
  }
  handleChangeColor=(event)=>{
      console.log(event.currentTarget.style.color);
      event.currentTarget.style.color == "yellow" ? event.currentTarget.style.color = "lightgrey" : event.currentTarget.style.color = "yellow"
  }
  handleRemoveTask=(e)=>{

      firebase.database().ref(this.props.status+"/").remove()
      const items = this.state.items.map((value, index) => {
          return {id: index, task: value.task}
      })
      const element = items.splice(e.currentTarget.value, 1);
      firebase.database().ref(this.props.status+"/").set(items)
      this.setState({
          items: items,
      });
      return element


    //   if (typeof this.props.onAdd === "function") {
    //       this.props.onAdd(items, this.props.status);
    //   }
  }
  handleMoveItem=(e)=>{
    event.preventDefault();
    console.log(e.currentTarget.name, e.currentTarget.value);

    //   this.handleRemoveTask(e);
    const items = this.state.items.slice()
    items.push(this.handleRemoveTask(e));
    // this.setState({
    //     items: items,
    // });
    firebase.database().ref(e.currentTarget.name+"/").set(items)



    // const element = e.currentTarget.value;
    // if (typeof this.props.onMove === "function") {
    //     this.props.onMove(element, this.props.status);
    // }
  }
  // componentWillReceiveProps(nextProps){
  //     this.setState({
  //         items: nextProps.items,
  //         })
  // }
  render() {
      const DragHandle = SortableHandle(() =>
          <p className="dragLine">&#8691;</p>
      );
      const SortableItem = SortableElement(({value, index}) =>{
          console.log("value w sortowni", value);
        return (<li className="boardText">
        <a onClick={this.handleChangeColor.bind(this)}
        style={{color: "lightgrey"}}>
        &#9733;</a>
        <button onClick={this.handleRemoveTask}
        value={value.id}>
            {this.props.remove}
        </button>
        <button  className="move"
        value={value.id}
        name={this.props.action2}
        onClick={this.handleMoveItem}>{this.props.action2}</button>
        <input type="text"
        onChange={this.handleEditDescription}/>
        <h2>{value.task}</h2>
            <DragHandle />
        </li>)
    });


      const SortableList = SortableContainer(({items}) => {
          console.log("sortowany",items.task);
        return (
          <ul className="contentColumn">
            {items.map((value, index) => {
                console.log("value", value);
            return (<SortableItem key={`item-${index}`}
              index={index}
              value={value}/>
                )}
            )}
          </ul>
        );
    });
    return <div>
    <div className="columns">
        <h1>{this.props.status}<span>({this.state.items.length} tasks left)</span></h1>
        <SortableList items={this.state.items} onSortEnd={this.onSortEnd}
        useDragHandle={true} helperClass="SortableHelper"/>
    </div>
        <form onSubmit={this.handleAddTask}>
            <input type="text"
            name="newTask"
            placeholder="New task..."
            value={this.state.inputText}
            onChange={this.handleEditTask}/>
        </form>
    </div>
  }
}

export default SortableComponent
