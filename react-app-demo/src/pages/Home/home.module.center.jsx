import { useState } from 'react'
import { useImmer } from 'use-immer'
import './../../assets/css/home.scss'

function AlertButton({name, message}) {
  
  function handleClick() {
    alert(message)
  }

  return (
    <>
      {/* 传递事件处理函数时应直接传递，而不是调用（不得带上’()‘） */}
      <button onClick={handleClick}>{name}</button>

      {/* 内联的事件处理函数 */}
      <button onClick={function () {
        alert(message)
      }}>{name}-这是内联的事件处理函数</button>

      {/* 更为简洁的箭头函数 */}
      <button onClick={()=>{alert(message)}}>{name}-箭头函数</button>
    </>
  )
}

// 事件的捕获、冒泡、默认行为
function ButtonType(){

  const handleClick1 = () => {
    alert('我是button1')
  }

  const handleClick2 = (e) => {
    e.stopPropagation()
    alert('我是button2')
  }

  const handleClick3 = () => {
    alert('我是button1和2的父节点')
  }

  function handleClick4(message){
    alert(message)
  }

  function handleDefaultEvent(e){
    // 阻止默认行为
    e.preventDefault()
  }

  return (
    <>
      {/* 事件冒泡 */}
      <div onClick={handleClick3}>
        <button onClick={handleClick1}>事件冒泡 button1</button>
        <br/>
        <button onClick={handleClick2}>不会冒泡 button2</button>
      </div>

      {/* 事件捕获 */}
      <div onClickCapture={() => { handleClick4('我是父') }} className='parent-node'>
        <div onClick={()=>handleClick4('我是子')}></div>
      </div>

      {/* 阻止默认事件 */}
      <a href="https://www.baidu.com" onClick={handleDefaultEvent}>百度</a>
    </>
  )
}

// 更新state中的对象 -- useState
function UpdateObj() {
  const [obj, setObj] = useState({
    a: 1,
    b: 2,
    c: 3,
    d: { e: 4, f: 5 }
  })

  // 采用...扩展运算符+属性覆盖 简化对对象的复制
  function handleClick(){
    setObj({
      ...obj,
      b: 22,
      d: {
        ...obj.d,
        f: 555
      }
    })
  }

  return (
    <>
      <div>
        {/* 由于state更新时会覆盖原值，需完全复制并更新局部数据 */}
        <button onClick={() => {
          setObj({
            a: 11,
            b: 22,
            c: 33,
            d: { e: 44, f: 55 }
          })
        }}>更新对象</button>

        <button onClick={handleClick}>局部数据更新</button>
      </div>

      <div>
        <p>obj.a: {obj.a}</p>
        <p>obj.b: {obj.b}</p>
        <p>obj.c: {obj.c}</p>
        <p>obj.d.e: {obj.d.e}</p>
        <p>obj.d.f: {obj.d.f}</p>
      </div>
    </>
  )
}

// 使用 Immer 编写简洁的更新逻辑
function UpdateObjByImmer(){

  const [obj, setObj] = useImmer({
    a: 1,
    b: {
      c: 2
    }
  })
  return (
    <>
      <div>
        <button onClick={() => {
          setObj(draft => {
            draft.a = 11
            draft.b.c = 22
          })
        }}>更新对象</button>
        <div>
          <p>obj.a: {obj.a}</p>
          <p>obj.b.c: {obj.b.c}</p>
        </div>
      </div>
    </>
  )
}

// 更新state中的数组
// 不应该使用索引值、push、pop、shift、unshift、splice、reverse、sort等会修改原始数组数据的方法
// 可以通过像filter、map、slice、concat、[...arr]、数组复制等返回一个新数组，但是[...]复制出来的事浅拷贝，会有问题
function UpdateArr(){
  const [arr, setArr ] = useState([1, 2, 3])

  // const [arr2, setArr2] = useImmer([1,2,3])

  // 使用Immer更新数组
  // function handleClick() {
  //   setArr2(draft => {
  //     draft.push(Math.random().toFixed(3))
  //   })
  // }

  return (
    <>
      <div>
        <button onClick={() => {
          // 可使用扩展运算符（...）配合用于新增数据
          setArr([...arr, Math.random().toFixed(3)])
        }}>更新数组</button>
        <div>
          <p>arr: {arr.join(',')}</p>
        </div>
      </div>
    </>
  )
}

// React中state变量不是双向绑定的，需自行回掉设置
function ObserveValue() {
  const [val, setVal] = useState('')
  // 用户输入时，同步更新变量
  function handleInput(e){
    setVal(e.target.value)
  }
  return(
    <>
      <input type="text" value={val} onChange={handleInput} />
      <p>val: {val}</p>
    </>
  )
}

// 不同位置的同一组件具有独立的state，各自隔离
// 当其一位置的元素删除后又加载，state将重新计算
function InputBox() {
  const [show, setShow] = useState(true)
  return (
    <div style={{backgroundColor:  'red'}}>
      <button onClick={() => setShow(!show)}>{show ? '隐藏' : '显示'}</button>
      {show && <ObserveValue />}
      <ObserveValue />
    </div>
  )
}

// 相同位置的相同组件state将会保留状态
// 相同位置的不同组件state将会重置
// 在相同位置重置state：要么不同位置，要么使用key来配合

export default function Center(){

  return (
    <div className='center-box'>
      <AlertButton {...{name: '点我啊', message: '我是alert按钮'}} />

      <ButtonType />

      <UpdateObj />

      <UpdateObjByImmer />

      <UpdateArr />

      <ObserveValue />

      <InputBox />
    </div>
  )
}