import { useState } from 'react'
import './../../assets/css/home.scss'

// 具名导出
// 具名导入：import { TopLeft } from '...'
export function TopLeft({onClick, size = 0}) {
  return (
    <div onClick={onClick}>left{size}</div>
  )
}

// {onCLick} 解构，支持默认值
function TopRight({onClick, size = 0}) {
  return (
    <div onClick={onClick}>right{size}</div>
  )
}

// JSX 作为子组件传递（组件嵌套）
function Base(props){
  return (
    <User {...props}>
      <div>将JSX作为子组件传递</div>
    </User>
  )
}

function User(props) {
  return (
    <div>
      <Info {...props} />
      {props.children}
    </div>
  )
}

function Info({name, age, country}) {
  return (
    <>
      <div>{name}</div>
      <div>{age}</div>
      <div>{country}</div>
    </>
  )
}

// 事件组件
function GetT() {
  const [time, setTime] = useState(new Date().getTime())
  setInterval(() => {
    setTime(new Date().getTime())
  }, 1000);

  return (
    <div>{time}</div>
  )
}

export default function Top(){

  const info = {
    name: 'hwg',
    age: 100,
    country: 'China'
  }

  const [direction, setDirection] = useState('')

  function handleClick(dir) {
    if(dir === 'left'){
      setDirection('左')
    }else if(dir === 'right'){
      setDirection('右')
    }
  }

  return (
    <>
      <div className='flex-row-between'>
        {/* 通过Props传递任何 JavaScript 值，包括对象、数组和函数 */}
        <TopLeft onClick={() => handleClick('left')} size={100} />
        <div>{direction}</div>
        <TopRight onClick={() => handleClick('right')} />
      </div>
      
      {/* 展开语法传递props */}
      <Base {...info} />

      <GetT />
    </>
  )
}