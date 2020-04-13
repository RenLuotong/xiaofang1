const webpack = require('webpack');
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var config = {
  	entry:  {
  		// index:__dirname +'/src/index_module/js/entry/index.js',
		login:__dirname +'/src/login_module/js/entry/index.js',
		xitong:__dirname +'/src/xitong_module/js/entry/index.js',
		// zhidui:__dirname +'/src/zhidui_module/js/entry/index.js',
      	dadui:__dirname +'/src/dadui_module/js/entry/index.js',
    //   	zhongdui:__dirname +'/src/zhongdui_module/js/entry/index.js',
		  // zhongdui_tongji:__dirname +'/src/zhongdui_module/js/entry/tongji_index.js',
  	},

  	output: {
		publicPath:'/',
    	path: __dirname + "/dist",//打包后的文件存放的地方
    	filename: "js/[name].bundle.js",//打包后输出文件的文件名
  	},

  	externals:{
  	},

  	devServer: {
   		contentBase: "./dist",//本地服务器所加载的页面所在的目录
   		historyApiFallback: true,//不跳转
   		hot: true,
   		inline: true,//实时刷新
 		  port:8080
  	},

	optimization: {
	   	splitChunks: {
		   	chunks: "async", // 必须三选一： "initial" | "all"(默认就是all) | "async"
		   	minSize: 200000, // 最小尺寸，默认0
		   	minChunks: 1, // 最小 chunk ，默认1
		   	automaticNameDelimiter: "-",
		   	maxInitialRequests: 3,
		   	name: true, // 名称，此选项可接收 function
		},
	 	minimize:false,  //压缩JS

  	},

  	module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader?cacheDirectory",
                    options: {
                		cacheDirectory: true,
                        presets: [[ "env", {
						  	"targets": {
								"browsers": ["ie 10"]
						  	},
						  	"modules": false,
						  	"useBuiltIns": false,
						  	"include": ["transform-es2015-arrow-functions"],
						}],"react","stage-0"],
                        plugins: [  //按需加载
                        	"transform-runtime",
						    ["import", {
						      	"libraryName": "antd",
						      	"libraryDirectory": "lib",
						      	"style": true
					    	}],
					    	"syntax-dynamic-import"
					  	]
                    }
                },
                exclude: /node_modules/
            },
	        {
		        test: /\.css$/,
		        use:["style-loader","css-loader"]
	        },
	        {
		        test: /\.less$/,
		        use:[{
			        loader:"style-loader"
		        },{
			        loader:"css-loader"
		        },{
			        loader:"less-loader",
			        options:{
				        modifyVars: {
					        'primary-color':'#2c4aac',
				        },
				        javascriptEnabled: true,
			        }
		        }]
	        },
	        {
		        test: /\.scss$/,
		        use:[{
			        loader:"style-loader"
		        },{
			        loader:"css-loader"
		        },{
			        loader:"sass-loader"
		        }]
	        },
          //   {
					//     test: /\.css$/,
					//     use: ExtractTextPlugin.extract({
					//         publicPath:'../',
          //         fallback:"style-loader",
          //         use:"css-loader"
					//     })
					// 	},
          //   {
          //    test: /\.less$/,
	        //     use:ExtractTextPlugin.extract({
	        //     	  publicPath:'../',
	        //         fallback:"style-loader",
	        //         use:[{
	        //             loader:"css-loader"
	        //         },{
          //       		loader:"less-loader",
		      //           options:{
			    //             modifyVars: {
			    //             	'primary-color':'#2c4aac',
			    //             },
			    //             javascriptEnabled: true,
		      //           }
	        //         }]
	        //     })
          //   },
	        // {
		      //   test: /\.scss$/,
		      //   use: ExtractTextPlugin.extract({
			    //     publicPath:'../',
			    //     fallback: 'style-loader',
			    //     use:[{
				  //       loader:"css-loader"
			    //     },{
				  //       loader:"sass-loader"
			    //     }]
		      //   })
	        // },
        	{
　　　　　　		test: /\.(png|jpg|gif)$/,
　　　　　　		loader: 'url-loader?limit=8192&name=imgs/[hash:8].[name].[ext]'
			}
        ]
    },

	plugins:[

		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin({filename:'css/[name].css',  disable: true}),
		new HtmlWebpackPlugin({
			title:"消防救援一体化管理平台",
			filename:"xitong.html",
			template:__dirname+'/src/xitong_module/xitong.html',
   		  	chunks: ['']
	    }),

	    new HtmlWebpackPlugin({
			title:"消防救援一体化管理平台",
			filename:"dadui.html",
			template:__dirname+'/src/dadui_module/dadui.html',
   		  	chunks: ['']
	    }),
	  //   new HtmlWebpackPlugin({
		// 	title:"消防救援一体化管理平台",
		// 	filename:"zhidui.html",
		// 	template:__dirname+'/src/zhidui_module/zhidui.html',
   	// 	  	chunks: ['']
	  //   }),
		//
	  //   new HtmlWebpackPlugin({
		// 	title:"消防救援一体化管理平台",
		// 	filename:"index.html",
		// 	template:__dirname+'/src/index_module/index.html',
   	// 	  	chunks: ['']
	  //   }),
		// new HtmlWebpackPlugin({
		// 	title:"消防救援一体化管理平台",
		// 	filename:"zhongdui.html",
		// 	template:__dirname+'/src/zhongdui_module/zhongdui.html',
		// 	chunks: ['']
		// }),
		// new HtmlWebpackPlugin({
		// 	title:"消防救援一体化管理平台",
		// 	filename:"zhongdui_tongji.html",
		// 	template:__dirname+'/src/zhongdui_module/zhongdui_tongji.html',
		// 	chunks: ['']
		// }),
		new HtmlWebpackPlugin({
			title:"消防救援一体化管理平台",
			filename:"login.html",
			template:__dirname+'/src/login_module/login.html',
			chunks: ['']
		}),
    ]
}

module.exports=config;
