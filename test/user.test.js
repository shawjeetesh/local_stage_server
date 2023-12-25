// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const server = require('../app');

// chai.use(chaiHttp)

// describe("User Api",()=>{
//     describe("Portfolio Apis",()=>{
//         // it("Get portfolio/create",(done)=>{
//         //     chai.request(server)
            
//         //     .get("/user/protfolio/create")
//         //     .set({"authentication": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjFjYTE1NmNiZjE0YzMwMjc1MTYzZDM0IiwidGltZSI6MTY0MjI2Nzg4NjA0MywiaWF0IjoxNjQyMjY3ODg2fQ.hL6PD0tzo1EfX1i_2mhrgSCCGNLqhoNBcnU2BtC1kib_e6a3mmSZ-a_nHQqLw59Dv3rPD3z-T0BtRqP1DPcV3vs3FmayCUZIkiCOam2B0uJmfK6RPJM05ZLu_p11c7eHc2ZIkej9_81a3HlqDZx0fbAj5-1lZLGXOZ__I96Mcw_uPOieCRijRP61Bhgj2DAv3Rd0MOsq6oPyAVM8u9LxLLs-Wt79XEXuLEWZ_ufBgLKO93x11jbkimagOWUCw29FTcpGeDHvCdWGhNAx3VQRysI_asxPFI_AHtR4wWS4ZWpp5Rxf4nqyr9iKsaBBlBsBvsEpIYHCXoDasUsyRj1KQrqkFyi93Mtt3y4mQUFpJr7h8P-Zkkx3o2ttcaNNWy0ZEQ5S2MfXB0pR_Ss0Q-WdfS8tiCV_NX2iZNx8Q4mqeaF5TtrxmidsI5Z3qyA8hK_t645JzEHK7J78c6I8y1PF2GDnOe6aQYecVVHKAuWAFaBVz_xLTiCRPJiZtUTlEOJW"})
//         //     .end((err, response)=>{
//         //         // console.log(response.body)
//         //         response.should.have.status(200)
//         //         response.body.should.have.property("status").eql("success");
//         //         // response.body.data.have.property("_id")
//         //     })
//         //     done();
//         // })

//         it("Get error portfolio/:id",(done)=>{
//             chai.request(server)
//             .get("/user/protfolio/hello")
//             .set({"authentication": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjFjYTE1NmNiZjE0YzMwMjc1MTYzZDM0IiwidGltZSI6MTY0MjI2Nzg4NjA0MywiaWF0IjoxNjQyMjY3ODg2fQ.hL6PD0tzo1EfX1i_2mhrgSCCGNLqhoNBcnU2BtC1kib_e6a3mmSZ-a_nHQqLw59Dv3rPD3z-T0BtRqP1DPcV3vs3FmayCUZIkiCOam2B0uJmfK6RPJM05ZLu_p11c7eHc2ZIkej9_81a3HlqDZx0fbAj5-1lZLGXOZ__I96Mcw_uPOieCRijRP61Bhgj2DAv3Rd0MOsq6oPyAVM8u9LxLLs-Wt79XEXuLEWZ_ufBgLKO93x11jbkimagOWUCw29FTcpGeDHvCdWGhNAx3VQRysI_asxPFI_AHtR4wWS4ZWpp5Rxf4nqyr9iKsaBBlBsBvsEpIYHCXoDasUsyRj1KQrqkFyi93Mtt3y4mQUFpJr7h8P-Zkkx3o2ttcaNNWy0ZEQ5S2MfXB0pR_Ss0Q-WdfS8tiCV_NX2iZNx8Q4mqeaF5TtrxmidsI5Z3qyA8hK_t645JzEHK7J78c6I8y1PF2GDnOe6aQYecVVHKAuWAFaBVz_xLTiCRPJiZtUTlEOJW"})
//             .end((err, response)=>{
//                 response.should.have.status(404);
//                 response.body.should.have.property("status").eql("failed");
//                 done();
//             })
//         })
//         it("Get portfolio/:id",(done)=>{
//             chai.request(server)
//             .get("/user/protfolio/61e30b881e001a38c6dbb755")
//             .set({"authentication": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjFjYTE1NmNiZjE0YzMwMjc1MTYzZDM0IiwidGltZSI6MTY0MjI2Nzg4NjA0MywiaWF0IjoxNjQyMjY3ODg2fQ.hL6PD0tzo1EfX1i_2mhrgSCCGNLqhoNBcnU2BtC1kib_e6a3mmSZ-a_nHQqLw59Dv3rPD3z-T0BtRqP1DPcV3vs3FmayCUZIkiCOam2B0uJmfK6RPJM05ZLu_p11c7eHc2ZIkej9_81a3HlqDZx0fbAj5-1lZLGXOZ__I96Mcw_uPOieCRijRP61Bhgj2DAv3Rd0MOsq6oPyAVM8u9LxLLs-Wt79XEXuLEWZ_ufBgLKO93x11jbkimagOWUCw29FTcpGeDHvCdWGhNAx3VQRysI_asxPFI_AHtR4wWS4ZWpp5Rxf4nqyr9iKsaBBlBsBvsEpIYHCXoDasUsyRj1KQrqkFyi93Mtt3y4mQUFpJr7h8P-Zkkx3o2ttcaNNWy0ZEQ5S2MfXB0pR_Ss0Q-WdfS8tiCV_NX2iZNx8Q4mqeaF5TtrxmidsI5Z3qyA8hK_t645JzEHK7J78c6I8y1PF2GDnOe6aQYecVVHKAuWAFaBVz_xLTiCRPJiZtUTlEOJW"})
//             .end((err, response)=>{
//                 response.should.have.status(200);
//                 response.body.should.have.property("status").eql("success");
//                 response.body.should.have.property("data").be.a("object");

//                 done();
//             })
//         })
//     })
// })


