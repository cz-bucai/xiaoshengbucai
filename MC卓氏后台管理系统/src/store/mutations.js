export default {
    //修改state菜单
    REQ_MENULIST(state,payload){
        state.menuList = payload
    },
     //修改state角色
     REQ_ROLELIST(state,payload){
        state.roleList = payload
    },
}