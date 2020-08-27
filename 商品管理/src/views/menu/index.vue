<template>
  <div>
    <!-- 面包屑 -->
    <el-bred></el-bred>
    <!-- 添加 -->
    <div>
      <el-button @click="openDialog" type="primary" size="mini" plain>添加</el-button>
    </div>
    <!-- 表格 -->
    <v-list @edit="edit"></v-list>
    <!-- 弹出对话框 -->
    <v-dialog ref="vDialog" :isShow="sonStatus" @closeDialog="closeDialog"></v-dialog>
  </div>
</template>

<script>
import elBred from "../../components/elBred";
import vList from "./list";
import vDialog from "./add";
export default {
  data() {
    return {
      sonStatus: {
        isAdd: true, //是否是添加
        dialogShow: false, //控制对话框的显示隐藏
      },
    };
  },

  methods: {
    //封装打开弹框事件(新增按钮)
    openDialog() {
      this.sonStatus.isAdd = true;
      this.sonStatus.dialogShow = true;
    },
    //关闭弹框事件
    closeDialog(e) {
      this.sonStatus.dialogShow = e;
    },
    //编辑事件
    edit(e) {
      this.sonStatus.isAdd = e.isAdd;
      //打开弹框
      this.sonStatus.dialogShow = true;
      this.$refs.vDialog.update(e.id);
    },
  },
  components: {
    elBred,
    vList,
    vDialog,
  },
};
</script>

<style  lang="stylus" scoped>
.el-button {
  margin-bottom: 15px;
}
</style>
