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

// 待父组件传递部分为children
function User(props) {
  return (
    <div>
      <Info {...props} />
      {props.children}
    </div>
  )
}

// 一个组件必须时纯粹的，它不会更改在函数调用前就已经存在的对象或变量
function Info({name, age, country}) {
  return (
    <>
      <div>{name}</div>
      <div>{age}</div>
      <div>{country}</div>
    </>
  )
}

// 时间组件
function GetT() {
  const [time, setTime] = useState(new Date().getTime())
  setInterval(() => {
    setTime(new Date().getTime())
  }, 1000);

  return (
    <div>{time}</div>
  )
}

// 条件渲染+列表渲染
function DelNews({news}){
  return news.map((item, index)=>{
    // 使用if+return判断返回，注意返回null并不常见，可以在父组件里选择是否要渲染该组件
    // Warning: Each child in a list should have a unique "key" prop.
    // key值最好不要使用数组的索引值或随机生成，会带来意想不到的BUG或者造成运行变慢的问题
    if(item.isDel){
      // 当要返回多个DOM节点时，Fragment的简写形式'<></>'无法接受key，要么用div标签包裹起来，要么使用完整的Fragment写法'<Fragment>...</Fragment>'
      return <div key={index}>{item.sth} 已删除</div>
    }else{
      return <div key={index}>{item.sth}</div>
    }

    // 使用三目运算符？：
    // return <div>{item.sth}{item.isDel?'已删除' : ''}</div>

    // 使用&&运算符，在表达式的左侧若为true时，则返回其右侧值
    // return <div>{item.sth} {item.isDel && '已删除'}</div>
    // 切勿将数字放在&&左侧，如果左侧是个0，表达式将返回（0）
  })
}

export default function Top(){

  const info = {
    name: 'hwg',
    age: 100,
    country: 'China'
  }

  const newsList = [
    { sth: 'adfadajiofajdiasjda', isDel: true },
    { sth: 'adfadajiofajdiasjda', isDel: false },
    { sth: 'adfadajiofajdiasjda', isDel: false },
    { sth: 'adfadajiofajdiasjda', isDel: false },
    { sth: 'adfadajiofajdiasjda', isDel: false },
    { sth: 'adfadajiofajdiasjda', isDel: false },
  ]

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

      <DelNews news={newsList} />
    </>
  )
}