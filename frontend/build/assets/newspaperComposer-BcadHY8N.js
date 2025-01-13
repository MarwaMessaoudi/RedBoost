import{r as n,j as e,o as T}from"./index-CJ-wuhK9.js";import{G as oe}from"./index-Cohpzlek.js";/* empty css                   */import{Q as de,B}from"./react-toastify.esm-znZ9rGK_.js";/* empty css                      */import{b as ce,a as H}from"./index.esm-Cc_xDpa3.js";import{C as f,a as d}from"./CRow-Cad186SE.js";import{C as W,a as G}from"./CCardBody-BnIKpIl0.js";import{C as U}from"./CCardHeader-JMdQ0x5M.js";import{C as me}from"./CForm-UkVSUVnU.js";import{C as o}from"./CFormControlWrapper-Ctc-jqYh.js";import{C as x}from"./CFormInput-CBBV5oX5.js";import{C as R}from"./CFormCheck-C7IAmBl7.js";const $e=()=>{const w={"Empower Her":"danger",Tech:"success",Entrepreneurship:"warning",Green:"info"},[D,F]=n.useState(""),[c,E]=n.useState([]),[q,M]=n.useState([]),[K,V]=n.useState([]),[J,Y]=n.useState("english"),[u,P]=n.useState([]),[$,Q]=n.useState(""),[j,X]=n.useState([]),[h,Z]=n.useState(1e3),[y,_]=n.useState(""),[b,O]=n.useState(""),[v,ee]=n.useState(""),[C,te]=n.useState(""),[s,re]=n.useState(null),[i,A]=n.useState({target:!0,subject:!0,category:!0,n:!0,logo:!0,image1:!0,image2:!0,image3:!0}),[ge,z]=n.useState(""),se=async t=>{t.preventDefault();const a=`
      <table
        align="center"
        role="presentation"
        border="0"
        cellSpacing="0"
        cellPadding="0"
        width="100%"
        style={{
          maxWidth: '600px',
          margin: 'auto',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <tbody>
          <tr>
            <td align="center">
              <img
                src=${s.logo}
                alt="Logo"
                style={{ maxWidth: '100%', marginBottom: '10px' }}
              />
              <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>Redstart Tunisie</h2>
              <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                ${s.slogan}
              </p>
              <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px auto', maxWidth: '80%' }} />
            </td>
          </tr>
          <tr>
            <td style={{ color: '#333', fontSize: '16px', lineHeight: '1.6' }}>
              <div style={{ marginBottom: '20px' }}>
                <img
                  src=${s.image1}
                  alt="Featured Article"
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>${s.title}</h3>
                <p style={{ marginBottom: '10px' }}>${s.firstParagraph}</p>
                <a href=${s.firstButtonLink} style={{ color: '#007bff', textDecoration: 'none' }}>
                  ${s.firstButton}
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center" style={{ padding: '0 20px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: '1', paddingRight: '10px', textAlign: 'left' }}>
                  <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>${s.title2}</h2>
                  <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                    ${s.secondParagraph}
                  </p>
                </div>
                <div style={{ flex: '1', paddingLeft: '10px', textAlign: 'center' }}>
                  <img
                    src=${s.image2}
                    alt="Picture 1"
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ flex: '1', paddingRight: '10px', textAlign: 'center' }}>
                  <img
                    src=${s.image3}
                    alt="Picture 2"
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                  />
                </div>
                <div style={{ flex: '1', paddingLeft: '10px', textAlign: 'left' }}>
                  <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                    ${s.thirdParagraph}
                  </p>
                </div>
              </div>
              <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px 0', maxWidth: '80%' }} />
              <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px 0', maxWidth: '80%' }} />
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                Regards,<br />Redstart
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    `;try{const r=await T.post("/sendEmail",{html:a});console.log("Email sent successfully:",r.data),B.success("Email sent successfully")}catch(r){console.error("Error sending email:",r),B.error("Error sending email. Please try again later.")}},k=(t,a,r)=>{["femme","homme"].includes(r)?M(l=>a.includes(r)?l.filter(m=>m!==r):[...l,r]):I.includes(r)?V(l=>a.includes(r)?l.filter(m=>m!==r):[...l,r]):["English","french","spanich","arabic"].includes(r)&&Y(r),t(l=>a.includes(r)?l.filter(m=>m!==r):[...l,r])},ae=()=>e.jsxs("div",{children:[e.jsx("h2",{children:"Preview Emails"}),u&&u.length>0?e.jsx("ul",{children:u.map((t,a)=>e.jsx("li",{children:t},a))}):e.jsx("p",{children:"No emails to display."})]}),L=t=>{B.error(t,{autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})},ie=async t=>{t.preventDefault();let a=!0;const r={...i};if(c.length===0?(r.target=!1,a=!1):r.target=!0,$?r.subject=!0:(r.subject=!1,a=!1),j.length===0?(r.category=!1,a=!1):r.category=!0,!h||isNaN(h)||h<=0?(r.n=!1,a=!1):r.n=!0,!y||!S(y)?(r.logo=!1,a=!1):r.logo=!0,!b||!S(b)?(r.image1=!1,a=!1):r.image1=!0,!v||!S(v)?(r.image2=!1,a=!1):r.image2=!0,!C||!S(C)?(r.image3=!1,a=!1):r.image3=!0,!a){z("All fields are required and must be valid."),A(r),L("All fields are required and must be valid.");return}z(""),A(r);const l="AIzaSyDbXHLNx8MT8mdtu87t8sr4T8Ni18z0lhE",ne=new oe(l).getGenerativeModel({model:"gemini-1.5-flash"});try{const N=`Generate template in ${J} ( also make sure theres no extra symbles or explication of anything the resoponse is one json ready to be treated no back tics or any symbols except { and })for ${c.join(", ")}, ${$}, ${j.join(", ")} and it should be at least ${h} characters. It should be in this format containing template content: {
        title1: '',
        firstParagraph: '',
        firstButton: '',
        firstButtonLink: '',
        title2: '',
        SecondParagraph: '',
        title3: '',
        thirdParagraph: '',
        logo: '${y}',
        image1: '${b}',
        image2: '${v}',
        image3: '${C}'
      } also make sure theres no extra symbles or explication of anything the resoponse is one json ready to be treated`,g=await ne.generateContent(N);if(console.log("Generated result:",g),g&&g.response&&g.response.text){P();const p=await g.response.text();console.log("Generated text:",p);const le=JSON.parse(p);re(le)}else console.error("Empty response or missing data:",g),L("Empty response or missing data.");try{const p=await T.get("/filterEntrepreneurs",{params:{gender:q,region:K}});P(p.data)}catch{B.error("Error fetching filtered entrepreneurs")}console.log(u)}catch(N){console.error("Error generating template:",N),L("Error generating template.")}},S=t=>{try{return new URL(t),!0}catch{return!1}},I=["Tunis","Sfax","Sousse","Gabès","Bizerte","Ariana","Gafsa","Kairouan","Nabeul","Monastir","Zaghouan","Medenine","Kasserine","Mahdia","Manouba","Ben Arous","Kebili","Siliana","Jendouba","Tozeur","Kef","Sidi Bouzid","Tataouine","Beja"];return e.jsxs(ce,{children:[e.jsxs(f,{children:[e.jsx(d,{md:"6",children:e.jsxs(W,{children:[e.jsx(U,{children:e.jsx("h2",{children:"Generate Template"})}),e.jsx(G,{children:e.jsxs(me,{onSubmit:se,children:[e.jsx(o,{htmlFor:"subject",children:"Subject *"}),e.jsx(x,{type:"text",id:"subject",placeholder:"Enter subject",value:$,onChange:t=>Q(t.target.value),className:`form-control ${i.subject?"":"is-invalid"}`,required:!0}),!i.subject&&e.jsx("div",{className:"invalid-feedback",children:"Please enter a subject."}),e.jsxs(f,{children:[e.jsxs(d,{children:[e.jsx(o,{children:"Target *"}),["femme","homme","Entrepreneurs","Investors","Coaches"].map(t=>e.jsx(R,{type:"checkbox",id:`target-${t.toLowerCase()}`,label:t,name:"target",checked:c.includes(t),onChange:()=>k(E,c,t),className:`form-check-input ${i.target?"":"is-invalid"}`},t)),!i.target&&e.jsx("div",{className:"invalid-feedback",children:"Please select at least one target."})]}),e.jsxs(d,{children:[e.jsx(o,{children:"Category *"}),Object.keys(w).map((t,a)=>e.jsx(R,{type:"radio",id:`categoryRadio${a}`,name:t,label:t,checked:D===t,onChange:()=>F(t),className:`form-check-input text-${w[t]} mb-2`},a)),!i.category&&e.jsx("div",{className:"invalid-feedback",children:"Please select a category."})]})]}),e.jsxs(f,{children:[e.jsx(d,{children:e.jsxs("div",{className:"mt-3",style:{maxHeight:"150px",overflowY:"auto"},children:[e.jsx(o,{children:"Tunisian Regions"}),I.map(t=>e.jsx(R,{type:"checkbox",id:`region-${t}`,label:t,name:"tunisianRegions",checked:j.includes(t),onChange:()=>k(X,j,t),className:`form-check-input ${i.category?"":"is-invalid"}`},t))]})}),e.jsxs(d,{children:[e.jsx(o,{children:"language"}),["English","french","spanich","arabic"].map(t=>e.jsx(R,{type:"radio",id:`target-${t.toLowerCase()}`,label:t,name:"target",checked:c.includes(t),onChange:()=>k(E,c,t),className:`form-check-input ${i.target?"":"is-invalid"}`},t))]})]}),e.jsx(o,{children:"N *"}),e.jsx(x,{type:"number",placeholder:"Enter N",value:h,onChange:t=>Z(parseInt(t.target.value)),className:`form-control ${i.n?"":"is-invalid"}`,required:!0}),!i.n&&e.jsx("div",{className:"invalid-feedback",children:"Please enter a valid number for N."}),e.jsx(o,{children:"Logo URL *"}),e.jsx(x,{type:"text",placeholder:"Enter logo URL",value:y,onChange:t=>_(t.target.value),className:`form-control ${i.logo?"":"is-invalid"}`,required:!0}),!i.logo&&e.jsx("div",{className:"invalid-feedback",children:"Please enter a valid URL for the logo."}),e.jsx(o,{children:"Image 1 URL *"}),e.jsx(x,{type:"text",placeholder:"Enter image 1 URL",value:b,onChange:t=>O(t.target.value),className:`form-control ${i.image1?"":"is-invalid"}`,required:!0}),!i.image1&&e.jsx("div",{className:"invalid-feedback",children:"Please enter a valid URL for image 1."}),e.jsx(o,{children:"Image 2 URL *"}),e.jsx(x,{type:"text",placeholder:"Enter image 2 URL",value:v,onChange:t=>ee(t.target.value),className:`form-control ${i.image2?"":"is-invalid"}`,required:!0}),!i.image2&&e.jsx("div",{className:"invalid-feedback",children:"Please enter a valid URL for image 2."}),e.jsx(o,{children:"Image 3 URL *"}),e.jsx(x,{type:"text",placeholder:"Enter image 3 URL",value:C,onChange:t=>te(t.target.value),className:`form-control ${i.image3?"":"is-invalid"}`,required:!0}),!i.image3&&e.jsx("div",{className:"invalid-feedback",children:"Please enter a valid URL for image 3."}),e.jsx(H,{type:"submit",color:"primary",children:"send emails"}),e.jsx(H,{type:"button",color:"secondary",className:"mt-3",onClick:ie,children:"preview"})]})})]})}),e.jsx(d,{md:"6",children:s&&e.jsxs(W,{children:[e.jsx(U,{children:e.jsx("h2",{children:"Generated Template"})}),e.jsxs(G,{children:[e.jsx(f,{children:e.jsx(d,{children:ae()})}),e.jsx(f,{children:e.jsx(d,{children:s&&e.jsx("table",{align:"center",role:"presentation",border:"0",cellSpacing:"0",cellPadding:"0",width:"100%",style:{maxWidth:"600px",margin:"auto",fontFamily:"Arial, sans-serif",backgroundColor:"#ffffff",borderRadius:"8px",padding:"20px",boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.1)"},children:e.jsxs("tbody",{children:[e.jsx("tr",{children:e.jsxs("td",{align:"center",children:[e.jsx("img",{src:s.logo,alt:"Logo",style:{maxWidth:"100%",marginBottom:"10px"}}),e.jsx("h2",{style:{color:"#333",fontSize:"24px",marginBottom:"10px"},children:"Redstart Tunisie"}),e.jsx("p",{style:{color:"#666",fontSize:"16px",lineHeight:"1.6",marginBottom:"20px"},children:"slogen1 bird fathers and life is good"}),e.jsx("hr",{style:{border:"none",borderBottom:"1px solid #ddd",margin:"20px auto",maxWidth:"80%"}})]})}),e.jsx("tr",{children:e.jsx("td",{style:{color:"#333",fontSize:"16px",lineHeight:"1.6"},children:e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("img",{src:s.image1,alt:"Featured Article",style:{maxWidth:"100%",borderRadius:"8px"}}),e.jsx("h3",{style:{fontSize:"20px",marginBottom:"10px"},children:s.title}),e.jsx("p",{style:{marginBottom:"10px"},children:s.firstParagraph}),e.jsx("a",{href:s.firstButtonLink,style:{color:"#007bff",textDecoration:"none"},children:s.firstButton})]})})}),e.jsx("tr",{children:e.jsxs("td",{align:"center",style:{padding:"0 20px"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{style:{flex:"1",paddingRight:"10px",textAlign:"left"},children:[e.jsx("h2",{style:{color:"#333",fontSize:"24px",marginBottom:"10px"},children:s.title2}),e.jsx("p",{style:{color:"#666",fontSize:"16px",lineHeight:"1.6",marginBottom:"20px"},children:s.SecondParagraph})]}),e.jsx("div",{style:{flex:"1",paddingLeft:"10px",textAlign:"center"},children:e.jsx("img",{src:s.image2,alt:"Picture 1",style:{maxWidth:"100%",borderRadius:"8px"}})})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:"20px"},children:[e.jsx("div",{style:{flex:"1",paddingRight:"10px",textAlign:"center"},children:e.jsx("img",{src:s.image3,alt:"Picture 2",style:{maxWidth:"100%",borderRadius:"8px"}})}),e.jsx("div",{style:{flex:"1",paddingLeft:"10px",textAlign:"left"},children:e.jsx("p",{style:{color:"#666",fontSize:"16px",lineHeight:"1.6",marginBottom:"20px"},children:s.thirdParagraph})})]}),e.jsx("hr",{style:{border:"none",borderBottom:"1px solid #ddd",margin:"20px 0",maxWidth:"80%"}}),e.jsx("hr",{style:{border:"none",borderBottom:"1px solid #ddd",margin:"20px 0",maxWidth:"80%"}}),e.jsxs("p",{style:{color:"#666",fontSize:"14px",lineHeight:"1.6",marginBottom:"20px"},children:["Regards,",e.jsx("br",{}),"Redstart"]})]})})]})})})})]})]})})]}),e.jsx(de,{})]})};export{$e as default};
