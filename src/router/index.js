import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '../components/home/AppIndex'
import Login from '../components/Login'
import Home from '../components/Home'
import LibraryIndex from '../components/library/LibraryIndex'
import User from '../components/user/User'
import ClientUser from '../components/clientuser/ClientUser'
import Parking from '../components/parking/Parking'
import Fee from '../components/fee/Fee'
import Device from '../components/device/Device'
import FeePage from '../components/feepage/FeePage'
import ParkingRecord from '../components/parkingrecord/ParkingRecord'



Vue.use(Router)

export default new Router({
  // history 模式可以不加#访问项目e
  mode: 'history',
  routes: [
    // index 成为home的组件 访问home 就等于访问index
    // {
    //   path: '/home',
    //   name: 'Home',
    //   component: Home,
    //   redirect: '/index',
    //   children: [
    //     {
    //       path: '/index',
    //       name: 'AppIndex',
    //       component: AppIndex,
    //       // 需要拦截就添加以下元数据
    //       meta: {
    //         requireAuth: true
    //       }
    //     },
    //     {
    //       path: '/library',
    //       name: 'Library',
    //       component: LibraryIndex,
    //       meta: {
    //         requireAuth: true
    //       }
    //     }
    //   ]
    // },
    {
      path:'/home',
      name:'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/user',
          name: 'User',
          component: User,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/clientuser',
          name: 'ClientUser',
          component: ClientUser,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/parking',
          name: 'Parking',
          component: Parking,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/fee',
          name: 'Fee',
          component: Fee,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/device',
          name: 'Device',
          component: Device,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/feepage',
          name: 'FeePage',
          component: FeePage,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/parkingrecord',
          name: 'ParkingRecord',
          component: ParkingRecord,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }

  ]
})
