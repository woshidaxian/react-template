// 在 React 中，useState 以及任何其他以“use”开头的函数都被称为 Hook
// 只能在组件或自定义 Hook 的最顶层调用,类似于在文件顶部“导入”模块。
import { useState } from "react"


export default function HookPage(){

  // 数组解构，变量会保存上次渲染的值，更新变量的方法可以更新 state 变量并触发 React 重新渲染组件
  // const [state, setState] = useState()
  const [number, setNumber] = useState('')

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        // React 中存储的 state 可能已经发生了更改，但它是使用用户与之交互时状态的快照进行调度的！
        // React 会使 state 的值始终”固定“在一次渲染的各个事件处理函数内部，如同一张快照
        setTimeout(() => {
          alert(number); // 0
        }, 3000);
      }}>+5</button>
    </>
  )
}