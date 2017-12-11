/**异步请求商品列表**/
function loadProductByPage(pno){
  $.ajax({
    type:'POST',
    url: 'data/product/list.php',
    data: {pno: pno},
    success: function(pager){
      //填充商品列表
      var html = '';
      for(var p of pager.data){
        html +=  `
          <div class="col-sm-4">
											<div class="thumbnail">
												<!--span class="e-label"><div>Sale</div></span-->
												<span class="service-link text-center">
													<a href="product_details.html?lid=${p.lid}"><img src="${p.md}" alt=""/></a>
													<div class="list-inline">
														<a href=""><i class="fa fa-eye"></i></a>
														<a href=""><i class="fa fa-link"></i></a>
													</div>
												</span>
												<div class="caption">
													<div class="category"> 推荐指数
														<div class="pull-right">
															<i class="fa fa-star"></i>
															<i class="fa fa-star"></i>
															<i class="fa fa-star"></i>
															<i class="fa fa-star"></i>
															<i class="fa fa-star-o"></i>
														</div>
													</div>
													<h3><a href="product_details.html?lid=${p.lid}" class="title" title="${p.title}">${p.title}</a></h3>
													<strong>￥${p.price}</strong>
													<div><a href="#" class="btn btn-default" role="button">加入购物车</a><span class="pull-right"><i class="fa fa-heart-o"></i> 加入收藏</span></div>
												</div>
											</div>
										</div>
        `;
      }
      $('.salc_content').html(html);
      //创建分页条
      $(".pager").createPage({
        pageCount: pager.pageCount,
        current: pager.pno,
        backFn:function(p){
          loadProductByPage(p)
        }
      });
    }
  })
}
loadProductByPage(1);
