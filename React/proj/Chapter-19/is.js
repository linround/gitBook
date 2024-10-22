class WordCount extends HTMLDivElement{
  constructor(){
    super()
    this.attachShadow({mode:'open'})
    .innerHTML=`
    <style>
    :host{
      background: #eee;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
      color: red;
    }
    </style>
   <slot></slot>
    `
    this.addEventListener('click',()=>{
      alert(this.textContent.length)
    })
  }

}
customElements.define('word-count',WordCount, {extends:'div'})
