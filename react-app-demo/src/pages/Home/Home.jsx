import { useState } from 'react'
import './../../assets/css/home.scss'
import Top from './home.module.top'

// React组件是JavaScript函数，组件名称必须是大写字母开头
export default function Home(){

  // 不可嵌套定义组件，影响效率且有可能产生BUG
  // function SubComponent() {}

  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count+1)
  }

  function getTime() {
    return new Date().toLocaleDateString()
  }

  // 若return内容不在一行，需使用(...)将返回内容包裹起来，否则除第一行外将全部忽略
  return (
    // 必须要有父级元素或使用‘<></>’(Fragment)包裹
    // JSX要求标签必须正确闭合
    // 使用驼峰式命名给大部分属性赋值
    // JavaScript对变量的命名有限制，不能包含‘-’符号或者像class这样的保留字
    <>
      {/* 使用单引号或双引号传递字符串 */}
      {/* 动态赋值使用{}大括号 */}
      <div className='number' onClick={handleClick}>{count}</div> 
      <div id='num' onClick={()=>{setCount(0)}}>重置</div>
      {/* 传递对象{}，调用方法fn() */}
      <div style={{fontSize: '30px', color: 'yellow'}}>{getTime()}</div>
      <Top/>
    </>
    // JSX虽然看起来像HTML，但在底层其实被转化为了JavaScript对象，一个函数不能返回多个对象，除非用一个数组把它们包装起来
  )
}


