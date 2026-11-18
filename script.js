const IM={
 "fridge": "images/fridge.jpg",
 "tv": "images/tv.jpg",
 "tea": "images/tea.jpg",
 "washer": "images/washer.jpg",
 "dish": "images/dish.jpg",
 "range": "images/range.jpg",
 "vac": "images/vac.jpg",
 "mon": "images/mon.jpg",
 "hero": "images/hero.jpg"
};
const fa=n=>Number(n).toLocaleString('fa-IR');
const C=[
['fridge','یخچال و فریزر','یخچال ساید بای ساید',68000000,['S100 سفید','S110 نقره‌ای','S120 هوم‌بار','S130 دیسپنسر','S140 پلاس','S150 لوکس','S160 پرستیژ']],
['tv','تلویزیون هوشمند','تلویزیون هوشمند رونیا',24000000,['۴۳ اینچ Full HD','۵۰ اینچ 4K','۵۵ اینچ 4K','۶۰ اینچ 4K','۶۵ اینچ 4K','۷۰ اینچ 4K','۷۵ اینچ 4K']],
['tea','چای‌ساز','چای‌ساز شیشه‌ای هیوا',5900000,['مدل STM-GS1650','مدل STM-GS1700','مدل STM-GS1750','مدل لوکس چوبی','مدل دیجیتال','مدل پلاس','مدل پرمیوم']],
['washer','ماشین لباسشویی','لباسشویی نئو دایرکت درایو',42000000,['۷ کیلویی بوم','۸ کیلویی بوم','۸ کیلویی آوان','۹ کیلویی بوم','۹ کیلویی آوان','۹ کیلویی ادواش','۱۰ کیلویی پلاس']],
['dish','ماشین ظرفشویی','ظرفشویی ۱۴ نفره هیوا',38000000,['مدل SDW-A20W','مدل SDW-A20S','مدل SDW-B14W','مدل SDW-B15S','مدل SDW-C15 مشکی','مدل SDW-C16 وای‌فای','مدل SDW-D16 پلاس']],
['range','اجاق گاز و فر','اجاق گاز مبله مسترشف',31000000,['۵ شعله استیل','۵ شعله مشکی','۵ شعله سفید','۶ شعله استیل','۶ شعله نانو کلین','۶ شعله دیجیتال','۶ شعله لوکس']],
['vac','جاروبرقی','جاروبرقی بدون کیسه هیوا',9800000,['۲۰۰۰ وات','۲۱۰۰ وات','۲۲۰۰ وات HEPA','۲۳۰۰ وات','۲۴۰۰ وات اولترا','۲۵۰۰ وات سایلنت','۲۶۰۰ وات پرو']],
['mon','نمایشگر','نمایشگر هیوا',7200000,['۲۱٫۵ اینچ','۲۲ اینچ','۲۴ اینچ Full HD','۲۴ اینچ IPS','۲۷ اینچ IPS','۲۷ اینچ ۱۴۴Hz','۳۲ اینچ 4K']]];
const P=[];C.forEach(c=>c[4].forEach((m,i)=>P.push({id:c[0]+'-'+(i+1),cat:c[0],name:c[2]+' '+m,price:Math.round(c[3]*(1+i*.11)/10000)*10000,off:[8,0,12,5,15,10,7][i]})));
const $=s=>document.querySelector(s),cn=k=>C.find(c=>c[0]==k),pid=id=>P.find(p=>p.id==id);
const S=(d,w=18)=>`<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const I={plus:S('<path d="M12 5v14M5 12h14"/>'),minus:S('<path d="M5 12h14"/>'),trash:S('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),prev:S('<path d="M9 6l6 6-6 6"/>'),next:S('<path d="M15 6l-6 6 6 6"/>')};
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
let K=ld('cart',{}),O=ld('ord',[]),L=null,Q='';
Object.keys(K).forEach(k=>{if(!pid(k))delete K[k]});
const sv=()=>{try{localStorage.setItem('cart',JSON.stringify(K));localStorage.setItem('ord',JSON.stringify(O))}catch(e){}};
const cnt=()=>Object.values(K).reduce((a,b)=>a+b,0),old=p=>p.off?Math.round(p.price/(1-p.off/100)/1e4)*1e4:p.price;
const bd=()=>{$('#bd').hidden=!cnt();$('#bd').textContent=fa(cnt())};bd();
const stp=p=>`<div class="stp"><button data-ch="${p.id}:1" aria-label="افزودن">${I.plus}</button><b>${fa(K[p.id])}</b><button data-ch="${p.id}:-1" aria-label="کاهش">${K[p.id]>1?I.minus:I.trash}</button></div>`;
const ctl=p=>!p.st?'<button class="bt" disabled>ناموجود</button>':K[p.id]?stp(p):`<button class="bt" data-a="${p.id}">افزودن به سبد خرید</button>`;
const card=p=>`<div class="pc" data-p="${p.id}">${p.off?`<span class="off">${fa(p.off)}٪</span>`:''}<a href="#p-${p.id}"><img src="${IM[p.cat]}" alt=""></a><h3><a href="#p-${p.id}">${p.name}</a></h3><div class="pb">${p.off?`<s>${fa(old(p))}</s>`:''}<div class="pr">${fa(p.price)} <small>تومان</small></div></div><div class="ctl" data-id="${p.id}">${ctl(p)}</div></div>`;
const SZ=['کوچک','متوسط','بزرگ'],at=(a,i)=>a[i];
const D={
fridge:{col:[['سفید','#f2f2f2'],['نقره‌ای','#b5bac1'],['مشکی','#222']],d:'یخچال ساید بای ساید با فضای نگهداری وسیع و سیستم خنک‌کنندهٔ نوفراست که از یخ‌زدگی جلوگیری می‌کند. طراحی ساده و مدرن آن با فضای آشپزخانه‌های امروزی هماهنگ است.',pro:['فضای داخلی بزرگ و منظم','سیستم نوفراست بدون نیاز به یخ‌زدایی','طراحی مدرن و درهای صاف'],con:['ابعاد بزرگ و نیاز به فضای کافی','وزن زیاد هنگام جابه‌جایی'],sp:i=>[['ظرفیت کل',fa(24+i*2)+' فوت'],['نوع','ساید بای ساید'],['دیسپنسر آب و یخ',i%2?'دارد':'ندارد'],['برچسب انرژی','+A'],['سیستم خنک‌کننده','نوفراست']]},
tv:{col:[['مشکی','#111'],['نقره‌ای','#aab']],d:'تلویزیون هوشمند با پنل پرنور، رنگ‌های طبیعی و دسترسی به برنامه‌های آنلاین. قاب باریک آن روی میز و دیوار ظاهری شیک ایجاد می‌کند.',pro:['تصویر شفاف و رنگ‌های زنده','قاب باریک و طراحی شیک','دسترسی به برنامه‌های آنلاین'],con:['صدای داخلی برای سالن‌های بزرگ کافی نیست','زاویهٔ دید محدود در برخی مدل‌ها'],sp:i=>[['اندازهٔ صفحه',fa(at([43,50,55,60,65,70,75],i))+' اینچ'],['رزولوشن',i?'4K Ultra HD':'Full HD'],['سیستم‌عامل','اندروید'],['وای‌فای','دارد'],['تعداد پورت HDMI',fa(i>3?3:2)]]},
tea:{col:[['مشکی','#1b1b1b'],['چوبی','#7a4a2b'],['استیل','#c0c3c8']],d:'چای‌ساز شیشه‌ای با کتری و قوری روی هم که آب را سریع می‌جوشاند و چای را در دمای مناسب نگه می‌دارد. دستهٔ طرح چوب ظاهری گرم و کلاسیک به آن داده است.',pro:['جوش‌آمدن سریع آب','شیشهٔ مقاوم در برابر حرارت','نگه‌داشتن گرمای چای'],con:['شیشه نیاز به مراقبت بیشتری دارد','با آب سخت زودتر رسوب می‌گیرد'],sp:i=>[['ظرفیت کتری','۲ لیتر'],['ظرفیت قوری','۱ لیتر'],['توان',fa(2000+i*50)+' وات'],['جنس بدنه','شیشهٔ مقاوم'],['نگه‌داشتن دمای چای',i%2?'دارد':'ندارد']]},
washer:{col:[['سفید','#f2f2f2'],['نقره‌ای','#b5bac1']],d:'ماشین لباسشویی درب از جلو با موتور دایرکت درایو که بی‌سروصدا و کم‌لرزش کار می‌کند. برنامه‌های شستشوی متنوع برای انواع پارچه در اختیار شماست.',pro:['موتور بی‌صدا و کم‌لرزش','برنامه‌های شستشوی متنوع','مصرف انرژی بهینه'],con:['قیمت بالاتر از موتورهای معمولی','برای نصب به لوله‌کشی استاندارد نیاز دارد'],sp:i=>[['ظرفیت',fa(at([7,8,8,9,9,9,10],i))+' کیلوگرم'],['دور مرکزگریز',fa(at([1000,1200,1200,1400,1400,1400,1600],i))],['نوع موتور','دایرکت درایو'],['برچسب انرژی','A+++'],['تعداد برنامه',fa(12+i)]]},
dish:{col:[['سفید','#f2f2f2'],['مشکی','#222'],['نقره‌ای','#b5bac1']],d:'ماشین ظرفشویی ایستاده با پنل لمسی و برنامه‌های شستشوی کاربردی که ظرف‌ها را با مصرف آب کم تمیز می‌کند.',pro:['مصرف آب و برق پایین','پنل لمسی ساده','ظرفیت مناسب خانواده'],con:['نیاز به نمک و جلاده‌نده','بعضی ظرف‌های بزرگ جا نمی‌شوند'],sp:i=>[['ظرفیت',fa(at([14,14,14,15,15,16,16],i))+' نفره'],['تعداد برنامه',fa(8+i)],['اتصال وای‌فای',i>4?'دارد':'ندارد'],['برچسب انرژی','A++'],['مصرف آب',fa(10-Math.floor(i/3))+' لیتر']]},
range:{col:[['استیل','#b9bcc0'],['مشکی','#222'],['سفید','#f2f2f2']],d:'اجاق گاز مبله با فر بزرگ و نمایشگر دیجیتال. شعله‌های متنوع پخت‌وپز را راحت می‌کنند و سطح نانو کلین تمیز کردن را آسان می‌کند.',pro:['فر بزرگ و یکنواخت','سطح آسان‌تمیز','شعله‌های متنوع'],con:['ابعاد بزرگ','قیمت بالاتر از اجاق‌های ساده'],sp:i=>[['تعداد شعله',fa(i>2?6:5)],['ظرفیت فر','۱۰۰ لیتر'],['نمایشگر دیجیتال',i>4?'دارد':'ندارد'],['پوشش نانو کلین',i>3?'دارد':'ندارد'],['جنس بدنه','استیل']]},
vac:{col:[['آبی','#243a5e'],['مشکی','#222'],['نقره‌ای','#b5bac1']],d:'جاروبرقی بدون کیسه با موتور قدرتمند و فیلتر HEPA که گرد و غبار ریز را در خود نگه می‌دارد. بدنهٔ جمع‌وجور و چرخ‌های روان جابه‌جایی را ساده می‌کنند.',pro:['مکش قوی','فیلتر HEPA','صدای کم'],con:['تمیز کردن مخزن گرد و غبار','سیم برق کوتاه'],sp:i=>[['توان',fa(2000+i*100)+' وات'],['فیلتر',i>1?'HEPA 13':'استاندارد'],['حجم مخزن',fa(+((15+2*i)/10).toFixed(1))+' لیتر'],['طول سیم','۵ متر'],['نوع','بدون کیسه']]},
mon:{col:[['مشکی','#111'],['سفید','#f2f2f2']],d:'نمایشگر با قاب باریک و پایهٔ محکم برای کار اداری، تماشای فیلم و بازی. رنگ‌های دقیق و ورودی‌های متنوع آن را به انتخابی همه‌کاره تبدیل کرده است.',pro:['قاب باریک','رنگ‌های دقیق در پنل IPS','پایهٔ محکم'],con:['بلندگوی داخلی ندارد','قابلیت چرخش پایه محدود است'],sp:i=>[['اندازه',fa(at([21.5,22,24,24,27,27,32],i))+' اینچ'],['نوع پنل',i<2?'VA':'IPS'],['نرخ تازه‌سازی',fa(at([60,60,75,75,75,144,60],i))+' هرتز'],['رزولوشن',i==6?'4K':'Full HD'],['ورودی‌ها','HDMI و DisplayPort']]}};
P.forEach(p=>{const n=D[p.cat].col.length,i=+p.id.split('-')[1]-1;p.i=i;p.cols=i%3==0?[i%n,(i+1)%n]:[i%n];p.sz=[0,0,1,1,1,2,2][i];p.st=i!=5});
const INF={
installment:['خرید اقساطی','امکان خرید اقساطی کالاها با چک یا کارت اعتباری فراهم است. شرایط دقیق هر طرح در این نسخهٔ نمایشی فرضی است.'],
gift:['کارت هدیه','با کارت هدیه می‌توانید خرید کالاهای هیوا را به عزیزانتان هدیه بدهید. این بخش نمونه است.'],
stores:['فروشگاه‌ها','<ul class="ls"><li>تهران: فروشگاه مرکزی (نمونه)</li><li>اصفهان: شعبهٔ مرکزی (نمونه)</li><li>شیراز: شعبهٔ مرکزی (نمونه)</li><li>مشهد: شعبهٔ مرکزی (نمونه)</li><li>تبریز: شعبهٔ مرکزی (نمونه)</li><li>اهواز: شعبهٔ مرکزی (نمونه)</li></ul>'],
about:['دربارهٔ هیوا','هیوا یک نمونه‌کار طراحی فروشگاه لوازم خانگی است که برای نمایش مهارت طراحی و برنامه‌نویسی وب ساخته شده.'],
blog:['اخبار و مقالات','راهنمای انتخاب یخچال، نکات نگهداری لباسشویی و مقالات دیگر به‌زودی در این بخش قرار می‌گیرند.'],
jobs:['فرصت‌های شغلی','در حال حاضر موقعیت شغلی بازی در این نمونه وجود ندارد.'],
contact:['تماس با ما','برای ارتباط با ما از شماره و ایمیل نمونه استفاده کنید: ۰۲۱-۰۰۰۰۰۰۰۰ — info@example.com'],
service:['درخواست خدمات','برای ثبت درخواست خدمات پس از فروش با شمارهٔ پشتیبانی نمونه تماس بگیرید. فرم آنلاین در نسخهٔ واقعی اضافه می‌شود.'],
track:['پیگیری درخواست','کد پیگیری سفارش یا درخواست خود را در نسخهٔ واقعی اینجا وارد می‌کنید.'],
warranty:['شرایط گارانتی','همهٔ کالاها دارای گارانتی ۱۸ ماهه اصالت و سلامت فیزیکی کالا هستند (نمونه).'],
faq:['سؤالات متداول','ارسال کالا در شهرهای بزرگ ۲ تا ۴ روز کاری زمان می‌برد. هزینهٔ ارسال رایگان است. (نمونه)']};
const N=[['محصولات',C.map(c=>[c[1],fa(7)+' محصول','cat-'+c[0],c[0]])],
['جشنواره‌ها',[['جشنوارهٔ زمستانه','تا ۱۸٪ تخفیف کالاهای منتخب','sale'],['تخفیف‌های ویژه','کالاهای تخفیف‌دار','sale'],['خرید اقساطی','شرایط خرید اقساطی','i-installment'],['کارت هدیه','هدیه به عزیزان','i-gift']]],
['فروشگاه‌ها',['تهران','اصفهان','شیراز','مشهد','تبریز','اهواز'].map(x=>[x,'فروشگاه‌های '+x,'i-stores'])],
['جهان هیوا',[['دربارهٔ هیوا','معرفی ما','i-about'],['اخبار و مقالات','تازه‌ها','i-blog'],['فرصت‌های شغلی','به ما بپیوندید','i-jobs'],['تماس با ما','راه‌های ارتباطی','i-contact']]],
['خدمات پس از فروش',[['درخواست خدمات','ثبت درخواست','i-service'],['پیگیری درخواست','وضعیت درخواست','i-track'],['شرایط گارانتی','گارانتی کالاها','i-warranty'],['سؤالات متداول','پاسخ پرسش‌ها','i-faq']]],
['سری‌های محصولات',[['سری بوم','ماشین لباسشویی','cat-washer'],['سری آوان','ماشین لباسشویی','cat-washer'],['سری شف','اجاق گاز','cat-range'],['سری لوکس','چای‌ساز','cat-tea'],['سری پلاس','تلویزیون','cat-tv']]]];
$('#nv').innerHTML=N.map(n=>`<div class="has"><a href="#home">${n[0]}<i class="cv"></i></a><div class="mega"><div class="mg">${n[1].map(x=>`<a class="mi" href="#${x[2]}">${x[3]?`<img src="${IM[x[3]]}" alt="">`:'<i class="dot"></i>'}<span><b>${x[0]}</b><small>${x[1]}</small></span></a>`).join('')}</div></div></div>`).join('');
document.querySelectorAll('.has').forEach(h=>{h.firstChild.onclick=e=>{if(innerWidth<=900){e.preventDefault();h.classList.toggle('open')}};h.onmouseleave=()=>h.classList.remove('shut');h.querySelector('.mega').onclick=e=>{if(e.target.closest('a'))h.classList.add('shut')}});
document.addEventListener('click',e=>{const s=e.target.closest('[data-c]');if(s){s.parentElement.querySelectorAll('.swb').forEach(x=>x.classList.remove('sel'));s.classList.add('sel');$('#cn').textContent=s.dataset.c}});
document.addEventListener('click',e=>{const a=e.target.closest('[data-a]'),c=e.target.closest('[data-ch]');
 if(a){K[a.dataset.a]=1;upd(a.dataset.a)}
 if(c){const[id,d]=c.dataset.ch.split(':');K[id]=Math.min(9,(K[id]||0)+ +d);if(K[id]<=0)delete K[id];upd(id)}});
function upd(id){sv();bd();if(location.hash=='#cart')return cartPage();document.querySelectorAll(`.ctl[data-id="${id}"]`).forEach(el=>el.innerHTML=ctl(pid(id)))}
function sums(ids){let n=0,o=0,t=0;ids.forEach(i=>{const p=pid(i),q=K[i];n+=q;o+=old(p)*q;t+=p.price*q});return{n,o,t}}
function cartPage(){const a=$('#app'),ids=Object.keys(K);
 if(!ids.length){a.innerHTML=`<div class="emp">${S('<path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.4a2 2 0 0 0 2-1.5L20.5 8H6"/><circle cx="10" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/>',72)}<h2>سبد خرید شما خالی است</h2><a class="bt" href="#home">مشاهده محصولات</a></div>`;return}
 const s=sums(ids),pc=Math.round((s.o-s.t)/s.o*100);
 a.innerHTML=`<div class="w"><h1 class="ct">سبد خرید<span class="cn">${fa(s.n)} کالا</span></h1><div class="cl"><div class="ci">${ids.map(i=>{const p=pid(i);return`<div class="r2" data-p="${i}"><img src="${IM[p.cat]}" alt=""><div><h3><a href="#p-${i}">${p.name}</a></h3><span class="ok2">موجود در انبار هیوا</span><span class="gu">گارانتی ۱۸ ماهه اصالت و سلامت فیزیکی کالا</span>${stp(p)}</div><div class="pt">${p.off?`<span><s>${fa(old(p)*K[i])}</s><span class="dc">${fa(p.off)}٪</span></span>`:''}<b class="pr">${fa(p.price*K[i])} <small>تومان</small></b></div></div>`}).join('')}</div>
 <aside class="sm2"><div class="rw"><span>قیمت کالاها (${fa(s.n)})</span><span>${fa(s.o)}</span></div>${s.o>s.t?`<div class="rw rd2"><span>تخفیف کالاها</span><span>${fa(s.o-s.t)} (${fa(pc)}٪)</span></div>`:''}<div class="rw gn"><span>هزینه ارسال</span><span>رایگان</span></div><div class="rw tt"><span>جمع سبد خرید</span><span>${fa(s.t)} تومان</span></div><a class="cta" href="#checkout">ادامه و ثبت سفارش</a></aside></div></div>`}
function checkout(){const ids=Object.keys(K);if(!ids.length){location.hash='cart';return}const s=sums(ids);
 $('#app').innerHTML=`<div class="w"><div class="bc"><a href="#cart">سبد خرید</a> / اطلاعات ارسال</div><div class="cl"><div class="fm"><h2>اطلاعات گیرنده</h2><label>نام و نام خانوادگی</label><input id="f1"><label>شماره موبایل</label><input id="f2" inputmode="numeric" placeholder="09123456789"><label>آدرس کامل</label><textarea id="f3" rows="3"></textarea><div class="er" id="er"></div></div>
 <aside class="sm2"><h3 style="margin:0 0 8px">خلاصه سفارش</h3>${ids.map(i=>`<div class="rw"><span>${pid(i).name} × ${fa(K[i])}</span><span>${fa(pid(i).price*K[i])}</span></div>`).join('')}<div class="rw tt"><span>مبلغ قابل پرداخت</span><span>${fa(s.t)} تومان</span></div><button class="cta" id="sub">ثبت نهایی سفارش</button></aside></div></div>`;
 $('#sub').onclick=()=>{const nm=$('#f1').value.trim(),ph=$('#f2').value.replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).trim(),ad=$('#f3').value.trim(),er=$('#er');
  if(nm.length<3)return er.textContent='نام را کامل وارد کنید.';if(!/^09\d{9}$/.test(ph))return er.textContent='شماره موبایل معتبر نیست (مثال: 09123456789).';if(ad.length<8)return er.textContent='آدرس را کامل‌تر بنویسید.';
  L={code:'HV-'+Math.floor(100000+Math.random()*900000),nm,items:ids.map(i=>({n:pid(i).name,q:K[i]})),total:s.t};O.unshift(L);K={};sv();bd();location.hash='done'}}
const done=()=>$('#app').innerHTML=`<div class="dn">${S('<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',64)}<h2>سفارش شما ثبت شد</h2><p>${L.nm} عزیز، سفارش شما ثبت شد و همکاران ما با شما تماس می‌گیرند.</p><div class="cd">کد پیگیری: ${L.code}</div><p class="pr">${fa(L.total)} تومان</p><a class="bt" style="display:block;padding:12px" href="#home">بازگشت به فروشگاه</a></div>`;
function catPage(c){const a=$('#app'),n=c[0],d=D[n],F={cols:[],sz:[],off:0,st:0};
 a.innerHTML=`<div class="w"><div class="bc"><a href="#home">خانه</a> / محصولات / ${c[1]}</div><div class="top"><h1>${c[1]} <span id="ct" class="cn"></span></h1><select id="so"><option value="">مرتب‌سازی پیش‌فرض</option><option value="a">ارزان‌ترین</option><option value="d">گران‌ترین</option></select></div>
 <div class="cat"><details class="fl" id="fl" open><summary>فیلترها</summary><div class="fs"><b>محدودهٔ قیمت (میلیون تومان)</b><div class="pr2"><input id="mn" inputmode="numeric" placeholder="از"><input id="mx" inputmode="numeric" placeholder="تا"></div></div>
 <div class="fs"><b>رنگ</b>${d.col.map((x,k)=>`<label class="ck"><input type="checkbox" data-f="cols" value="${k}"><i class="sw" style="background:${x[1]}"></i>${x[0]}</label>`).join('')}</div>
 <div class="fs"><b>اندازه / ظرفیت</b>${SZ.map((x,k)=>`<label class="ck"><input type="checkbox" data-f="sz" value="${k}">${x}</label>`).join('')}</div>
 <div class="fs"><label class="ck"><input type="checkbox" data-f="off">فقط کالاهای تخفیف‌دار</label><label class="ck"><input type="checkbox" data-f="st">فقط کالاهای موجود</label></div><button class="bt" id="rs" style="width:100%">حذف همهٔ فیلترها</button></details><div class="g g2" id="gr"></div></div></div>`;
 if(innerWidth<=900)$('#fl').open=false;
 const num=s=>parseFloat(s.replace(/[۰-۹]/g,x=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(x)).replace('٫','.'))||0;
 const draw=()=>{const mn=num($('#mn').value),mx=num($('#mx').value),so=$('#so').value;
  let l=P.filter(p=>p.cat==n&&(!mn||p.price>=mn*1e6)&&(!mx||p.price<=mx*1e6)&&(!F.cols.length||p.cols.some(k=>F.cols.includes(k)))&&(!F.sz.length||F.sz.includes(p.sz))&&(!F.off||p.off)&&(!F.st||p.st));
  if(so)l.sort((x,y)=>so=='a'?x.price-y.price:y.price-x.price);
  $('#ct').textContent=fa(l.length)+' کالا';$('#gr').innerHTML=l.map(card).join('')||'<p>کالایی با این فیلترها پیدا نشد.</p>'};
 $('#fl').oninput=e=>{const t=e.target,f=t.dataset.f;if(f=='cols'||f=='sz'){const v=+t.value,s=F[f];t.checked?s.push(v):s.splice(s.indexOf(v),1)}else if(f)F[f]=t.checked;draw()};
 $('#so').onchange=draw;$('#rs').onclick=()=>{F.cols=[];F.sz=[];F.off=F.st=0;$('#fl').querySelectorAll('input').forEach(i=>i.type=='checkbox'?i.checked=false:i.value='');draw()};draw()}
function prodPage(p){const c=cn(p.cat),d=D[p.cat],sp=d.sp(p.i);
 $('#app').innerHTML=`<div class="w"><div class="bc"><a href="#home">خانه</a> / <a href="#cat-${p.cat}">${c[1]}</a> / ${p.name}</div>
 <div class="pp"><div class="pi">${p.off?`<span class="off">${fa(p.off)}٪</span>`:''}<img src="${IM[p.cat]}" alt=""></div><div><h1 class="pt1">${p.name}</h1><div class="mt">${p.st?'<span class="in">موجود در انبار</span>':'<span class="no">ناموجود</span>'}</div>
 <div class="lb">رنگ: <b id="cn">${d.col[p.cols[0]][0]}</b></div><div class="swr">${p.cols.map((k,j)=>`<button class="swb${j?'':' sel'}" data-c="${d.col[k][0]}" style="--c:${d.col[k][1]}" aria-label="${d.col[k][0]}"></button>`).join('')}</div>
 <div class="lb">اندازه / ظرفیت: <b>${SZ[p.sz]}</b></div><ul class="hl">${sp.slice(0,4).map(r=>`<li>${r[0]}: <b>${r[1]}</b></li>`).join('')}</ul>
 <div class="pbx">${p.off?`<s>${fa(old(p))}</s>`:''}<div class="pr big">${fa(p.price)} <small>تومان</small></div><div class="ctl" data-id="${p.id}">${ctl(p)}</div></div></div></div>
 <section class="sc"><h2>معرفی</h2><p>${d.d}</p></section><section class="sc"><h2>مشخصات فنی</h2><table class="tb">${sp.map(r=>`<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join('')}<tr><th>رنگ‌های موجود</th><td>${p.cols.map(k=>d.col[k][0]).join('، ')}</td></tr><tr><th>گارانتی</th><td>۱۸ ماه</td></tr></table></section>
 <section class="sc"><h2>نقاط قوت و ضعف</h2><div class="pc2"><div class="bx gd"><h3>نقاط قوت</h3>${d.pro.map(x=>`<div>${S('<path d="M5 12.5l4.5 4.5L19 7.5"/>',16)} ${x}</div>`).join('')}</div><div class="bx bdd"><h3>نقاط ضعف</h3>${d.con.map(x=>`<div>${S('<path d="M5 12h14"/>',16)} ${x}</div>`).join('')}</div></div></section>
 <section class="sc"><h2>کالاهای مرتبط</h2><div class="g">${P.filter(q=>q.cat==p.cat&&q.id!=p.id).slice(0,4).map(card).join('')}</div></section></div>`}
const salePage=()=>$('#app').innerHTML=`<div class="w"><div class="bc"><a href="#home">خانه</a> / تخفیف‌های ویژه</div><h1>تخفیف‌های ویژه</h1><div class="g">${P.filter(p=>p.off>=10).sort((x,y)=>y.off-x.off).map(card).join('')}</div></div>`;
const infoPage=k=>$('#app').innerHTML=`<div class="w"><div class="bc"><a href="#home">خانه</a> / ${INF[k][0]}</div><div class="fm"><h1>${INF[k][0]}</h1><p style="line-height:2">${INF[k][1]}</p></div></div>`;
function route(){const h=location.hash.slice(1)||'home',a=$('#app');$('#nv').classList.remove('show');document.querySelectorAll('.has.open').forEach(x=>x.classList.remove('open'));scrollTo(0,0);
 if(h.startsWith('cat-')&&cn(h.slice(4)))catPage(cn(h.slice(4)));
 else if(h.startsWith('p-')&&pid(h.slice(2)))prodPage(pid(h.slice(2)));
 else if(h=='sale')salePage();
 else if(h.startsWith('i-')&&INF[h.slice(2)])infoPage(h.slice(2));
 else if(h=='search'){const l=P.filter(p=>(p.name+cn(p.cat)[1]).includes(Q));a.innerHTML=`<div class="w"><h2>نتیجهٔ جستجو برای «${Q.replace(/</g,'')}»</h2><div class="g">${l.map(card).join('')||'محصولی پیدا نشد.'}</div></div>`}
 else if(h=='cart')cartPage();else if(h=='checkout')checkout();else if(h=='done'&&L)done();
 else{a.innerHTML=`<div class="hero"><img src="${IM.hero}" alt=""></div><div class="w"><h2>دسته‌بندی محصولات</h2><div class="car"><div class="row" id="rw">${C.map(c=>`<a class="arch" href="#cat-${c[0]}"><img src="${IM[c[0]]}" alt=""><b>${c[1]}</b></a>`).join('')}</div><button class="ar" style="right:-6px" aria-label="قبلی" onclick="rw.scrollBy({left:-420,behavior:'smooth'})">${I.prev}</button><button class="ar" style="left:-6px" aria-label="بعدی" onclick="rw.scrollBy({left:420,behavior:'smooth'})">${I.next}</button></div></div><div class="w" style="padding-top:0"><h2>پیشنهاد ویژه</h2><div class="g">${[0,8,16,24,10,19,30,38].map(i=>P[i]).map(card).join('')}</div></div>`}}
addEventListener('hashchange',route);route();
$('#bg').onclick=()=>$('#nv').classList.toggle('show');
$('#sx').onclick=()=>{$('#sb').classList.toggle('show');$('#si').focus()};
$('#si').oninput=e=>{Q=e.target.value.trim();if(Q){if(location.hash!='#search')location.hash='search';else route()}};
const op=h=>{$('#md').innerHTML=h;$('#ov').classList.add('show')},cl=()=>$('#ov').classList.remove('show');
$('#ov').onclick=e=>{if(e.target.id=='ov')cl()};
$('#od').onclick=()=>op(`<h3>سفارش‌های من</h3>${O.length?O.map(o=>`<div class="ol"><b>${o.code}</b><br>${(o.items||[]).map(x=>x.n+' × '+fa(x.q)).join('، ')}<br>${fa(o.total)} تومان</div>`).join(''):'<p>هنوز سفارشی ثبت نکرده‌اید.</p>'}<button class="bt" style="width:100%;margin-top:12px" onclick="cl()">بستن</button>`);
