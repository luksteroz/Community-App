import ReactDOM from 'react-dom';
import React from 'react';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';


class SortableComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          items: this.props.items,
          inputText: "",
          descriptionText:"",
          userName:"",
        };
    }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  }
  handleAddTask=(event)=>{
      event.preventDefault();
      const items = this.state.items.slice();
      items.push(this.state.inputText);
      this.setState({
          items: items,
          inputText: "",
      });
      if (typeof this.props.onAdd === "function") {
          this.props.onAdd(items, this.props.status);
      }
  }
  handleEditTask=(event)=>{
      this.setState({
          inputText: event.target.value,
      });
  }
  handleEditDescription=(event)=>{
      console.log("dziala");
      this.setState({
          descriptionText: event.target.value,
      });
  }
  handleChangeColor=(event)=>{
      console.log(event.currentTarget.style.color);
      event.currentTarget.style.color == "yellow" ? event.currentTarget.style.color = "lightgrey" : event.currentTarget.style.color = "yellow"
  }
  handleRemoveTask=(e)=>{
      const items = this.state.items.slice();
      const element = items.indexOf(e.currentTarget.value);
      items.splice(element, 1)
      this.setState({
          items: items,
      });
      if (typeof this.props.onAdd === "function") {
          this.props.onAdd(items, this.props.status);
      }
  }
  handleMoveItem=(e)=>{
    const element = e.currentTarget.value;
    if (typeof this.props.onMove === "function") {
        this.props.onMove(element, this.props.status);
    }
  }
  componentWillReceiveProps(nextProps){
      this.setState({
          items: nextProps.items,
          })
  }
  render() {
      const DragHandle = SortableHandle(() =>
          <p className="dragLine">&#8691;</p>
      );
      const SortableItem = SortableElement(({value, index}) =>{
        return (<li className="boardText">
        <a onClick={this.handleChangeColor.bind(this)}
        style={{color: "lightgrey"}}>
        &#9733;</a>
        <button onClick={this.handleRemoveTask}
        value={value}>
            {this.props.remove}
        </button>
        <button value={value} onClick={this.handleMoveItem}>{this.props.action2}</button>
        <h2>{value}</h2>
            <DragHandle />
        </li>)
    });


      const SortableList = SortableContainer(({items}) => {
        return (
          <ul className="contentColumn">
            {items.map((value, index) => {
            return (<SortableItem key={`item-${index}`}
              index={index}
              value={value}/>
          )})}
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
            value={this.state.inputText} onChange={this.handleEditTask}/>
        </form>
    </div>
  }
}

export default SortableComponent
