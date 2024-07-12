export const swiperCellBehavior = Behavior({
  data:{
    swipeCellQueue:[]
  },

  methods:{
    swipeCellOpen(event){
      const instance =  this.selectComponent(`#${event.target.id}`)
      this.data.swipeCellQueue.push(instance)
    },
    onSwipeCellPage(){
      this.onSwipeCellCommonClick()
    },
    onSwipeCellClick(){
      this.onSwipeCellCommonClick()
    },
    onSwipeCellCommonClick(){
      this.data.swipeCellQueue.forEach(instance=>{
        instance.close()
      })
      this.data.swipeCellQueue=[]
    }


  }

})