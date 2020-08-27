<template>
  <div>
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd?'添加管理员':'编辑管理员'"
      :visible.sync="isShow.dialogShow"
      center
    >
      <el-form :model="userForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="rolename" label="所属角色" :label-width="formLabelWidth">

         <el-select v-model="userForm.roleid" placeholder="请选择">
            <el-option
              v-for="item in get_RoleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="username" label="用户名称：" :label-width="formLabelWidth">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>

        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="userForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button @click="add('ruleForm')" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions,mapGetters } from "vuex";
import { getUserAdd, getUserInfo, getUserEdit } from "../../util/axios";
export default {
  props: ["isShow"],
  computed: {
      ...mapGetters(['get_RoleList'])
  },
  data() {
    return {
       editId: 0,
      changePage:1,
      formLabelWidth: "120px", //lable宽度
      userForm: {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1,
      },
      //表单验证（根据产品需求制定）
      rules: {
        roleid: [
          //代表加红色星标
          { required: true, message: "请输入角色名称", trigger: "change" },
        ],
         username: [
          //代表加红色星标
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          //验证字符数
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" },
        ],
      },
       defaultProps: {
        //树结构的显示配置项
        children: "children",
        label: "title",
      },
    };
  },
  mounted() {
    //获取角色列表
    this.getRoleListAction(); 
  },
  methods: {
    //封装一个清空事件
   reset() {
      this.userForm= {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1,
      }
      //子组件关闭弹框要去修改父组件dialogShow这个数据
      this.$emit("closeDialog", false);
    },
    //触发菜单列表的调取
   ...mapActions(["getRoleListAction",'getUserListAction']),
    //点击弹框获取一条数据
    update(uid,changePage) {
      this.editId = uid;
      this.changePage = changePage
      getUserInfo({ uid }).then((res) => {
        if (res.code === 200) {
          console.log(res, "一条数据");
          this.userForm = res.list;
        }
      });
    },
    //添加表单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //调取接口
          //是否调取新增事件还是编辑事件
          if (this.isShow.isAdd) {
            //调取添加接口
            getUserAdd(this.userForm).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
               this.isShow.getCount()
              }
            });
          } else {
            //id编号对数据进行编辑
            this.userForm.uid = this.editId;
            //调取添加接口
            getUserEdit(this.userForm).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
               this.getUserListAction({
                  size:2,
                  page:this.changePage
                })
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style  lang="" scoped>
</style>
