<template>
 <div>
     <!-- 面包屑 -->
     <el-bred></el-bred>
     <!-- 按钮 -->
     <div>
         <el-button round size='mini' >添加</el-button>
     </div>
     <template>
         
  <el-table
    :data="tableData"
    border
    style="width: 80%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
         <el-button type="primary" icon="el-icon-edit" plain circle></el-button>
        <el-button type="danger" icon="el-icon-delete" plain circle></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

    
  

 </div>
</template>

<script>
import elBred from '../components/elBred'
export default {
data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
 components:{
     elBred
 }
};
</script>

<style lang="stylus" scoped>
.el-button 
    margin-bottom 10px
</style>
