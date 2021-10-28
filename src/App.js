import './App.css';
import {useState} from "react";

function App() {

  const [boards, setBoards] = useState([
    {id: 1, title: 'Начало разработки', items: [{id: 1, title: 'Задача 1'}, {id: 4, title: 'Задача 2'},{id: 7, title: 'Задача 3'}]} ,
    {id: 2, title: 'Разработка', items: [{id: 2, title: 'Задача 4'}, {id: 5, title: 'Задача 5'}, {id: 8, title: 'Задача 6'}]} ,
    {id: 3, title: 'Тестирование', items: [{id: 3, title: 'Задача 7'}, {id: 6, title: 'Задача 8'}, {id: 9, title: 'Задача 9'}]} ,
  ])

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

  const draOverHandler = (e) => {
    e.preventDefault()
    if(e.target.className === 'item'){
      e.target.style.boxShadow = '0 2px 3px gray'
    }
  }

  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = 'none'
  }
  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board)
    setCurrentItem(item)

  }
  const dragEndHandler = (e) => {
    e.target.style.boxShadow = 'none'
  }
  const dragDropHandler = (e, board, item) => {
    e.preventDefault()

    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map(b => {
     if (b.id === board.id) {
          return board;
     } if (b.id === currentBoard.id) {
            return currentBoard;
      }
     return b
    }))
  }

  const dropCardHandler = (e, board) => {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board;
      } if (b.id === currentBoard.id) {
        return currentBoard;
      }
      return b
    }))
  }



  return (
    <div className="app">
      {boards.map(board => {
        return (
            <div
                onDragOver={e => draOverHandler(e) }
                onDrop={e => dropCardHandler(e, board)}

                className='board'>
              <div className="board__title"> {board.title} </div>
              {board.items.map(item => {

                return (
                    <div
                        onDragOver={e => draOverHandler(e) }
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragStart={e => dragStartHandler(e, board, item) }
                        onDragEnd= {e => dragEndHandler(e)}
                        onDrop={e => dragDropHandler(e, board, item) }
                        draggable={true}
                        className='item'> {item.title} </div>
                )
              })}

            </div>
        )
      })}
    </div>
  );
}

export default App;
