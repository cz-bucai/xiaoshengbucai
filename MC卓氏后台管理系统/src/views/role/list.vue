<template>
 <div>
     <!--表格  -->
    <el-table :data="get_RoleList" border >
      <el-table-column prop="id" label="角色编号" width="180" ></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template slot-scope="item">
          <el-button type="primary" @click="update(item.row.id)" icon="el-icon-edit" plain circle></el-button>
          <el-button type="dan ger" @click="del(item.row.id)" icon="el-icon-delete" plain circle></el-button>
        </template>
      </el-table-column>
    </el-table>
 </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getRoleDel } from "../../util/axios";
export default {
 data() {
 return {
 };
 },

   computed: {
    ...mapGetters(['get_RoleList'])
  },
  methods: {
    //封装获取角色列表
    ...mapActions(['getRoleListAction']),
     updated(id) {
       this.$emit('update',{
         id,
         isAdd:false
       })
     },
       //删除事件
    del(id) {
      this.$confirm("确定要删除该数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getRoleDel({id}).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //重新调取列表接口
              this.getRoleListAction()
            }else{
              this.$message.error(res.msg)
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="" scoped>

</style>
