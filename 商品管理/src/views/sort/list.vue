<template>
  <div>
    <!--表格  -->
    <el-table
      :data="get_CateList"
      border
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号" width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="img" label="图片" width="180">
        <template slot-scope="item">
          <div>
            <!-- {{item.row.img? "http://localhost:3000"+item.row.img : ''}} -->
            <!-- 没有上传图片的时候，我可以渲染默认图片 -->
            <img class="uploadImg" :src="item.row.img? uploadHttp+item.row.img : ''" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template slot-scope="item">
          <el-button type="primary" @click="update(item.row.id)" icon="el-icon-edit" plain circle></el-button>
          <el-button type="danger" @click="del(item.row.id)" icon="el-icon-delete" plain circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getCateDel } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    //触发商品分类的行动
    this.getCateListAction();
  },
  computed: {
    ...mapGetters(["get_CateList"]),
  },
  methods: {
    //封装获取分类列表
    ...mapActions(["getCateListAction"]),
    update(id) {
      this.$emit("update", {
        id,
        isAdd: false,
      });
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
          getCateDel({ id }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //重新调取列表接口
              this.getCateListAction();
            } else {
              this.$message.error(res.msg);
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
