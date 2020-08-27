<template>
  <div>
    <!-- 面包屑 -->
    <el-bred></el-bred>
    <!-- 添加 -->
    <div>
      <el-button @click="openDialog" type="primary" size="mini" plain>添加</el-button>
    </div>
    <!-- 表格 -->
    <el-role @update="update"></el-role>
    <!-- 弹出对话框 -->
    <v-add ref="vAdd" :isShow="sonStatus" @closeDialog="closeDialog"></v-add>
  </div>
</template>

<script>
import elBred from "../../components/elBred";
import elRole from "./list";
import vAdd from "./add";
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
    update(e) {
      this.sonStatus.isAdd = e.isAdd;
      //打开弹框
      this.sonStatus.dialogShow = true;
      this.$refs.vAdd.update(e.id);
    },
  },
  components: {
    elBred,
    elRole,
    vAdd,
  },
};
</script>

<style  lang="stylus" scoped>
.el-button {
  margin-bottom: 15px;
}
</style>
