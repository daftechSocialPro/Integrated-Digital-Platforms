import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";



export function successToast(message: string) {
  Swal.fire({
    title: message,
    icon: 'success',
    html: `<style>
    .swal2-popup {
      border-radius: 15px !important;
    }
  </style>`,
    timer: 2000,
    timerProgressBar: true,
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
    }
  });
  let timerInterval: any;
}


export function errorToast(message: string, errorDetail?: string) {
  Swal.fire({
    title: message,
    icon: 'error',
    html: `
    <style>
    .swal2-popup {
      border-radius: 30px !important;
    }
    .custom-scrollbar {
      max-height: 250px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #cccccc #f5f5f5;
    }
  
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
  
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f5f5f5;
      border-radius: 4px;
    }
  
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #cccccc;
      border-radius: 4px;
      border: 2px solid #f5f5f5;
    }
    .swal2-confirm.custom-dismiss-button {
      background-color: white;
      color: red;
      border: 1px solid red;
      border-radius: 5px;
      padding: 5px 10px;
      cursor: pointer;
      outline: none !important;
    }
    .swal2-confirm.custom-dismiss-button:focus {
      box-shadow: 0 0 0 0px red !important; /* Customize the focus outline */
    }
  </style>
      <a id="customButton" class="swal2-confirm swal2-styled" style="display: inline-block; color: #3085d6; text-decoration: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
        Show Error Detail
      </a>

      
      <div id="errorDetail" class="custom-scrollbar" style="display: none; margin-top: 10px; color: #f27474;">
  ${errorDetail || 'No additional error details available'}
</div>
      <hr style="margin: 5px 0;">
    `,
    timerProgressBar: true,
    confirmButtonText: 'Dismiss',
    //confirmButtonColor: '#ff6b6b',
    customClass: {
      confirmButton: 'custom-dismiss-button'
    },

    willClose: () => {
      clearInterval(timerInterval);
    },
    // didOpen: () => {
    //   // Handle button click within this scope
    //   const customButton = document.getElementById('customButton');
    //   if (customButton) {
    //     customButton.addEventListener('click', () => {

    //     });
    //   }
    // }
    didOpen: () => {
      const customButton = document.getElementById('customButton');
      const errorDetailDiv = document.getElementById('errorDetail');
      if (customButton && errorDetailDiv) {
        customButton.addEventListener('click', () => {
          if (errorDetailDiv.style.display === 'none') {
            errorDetailDiv.style.display = 'block';
            customButton.textContent = 'Hide Error Detail';
          } else {
            errorDetailDiv.style.display = 'none';
            customButton.textContent = 'Show Error Detail';
          }
        });
        customButton.addEventListener('mouseover', () => {
          customButton.style.textDecoration = 'underline'; // Add underline on hover
        });
        customButton.addEventListener('mouseout', () => {
          customButton.style.textDecoration = 'none'; // Remove underline when not hovered
        });
      }
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
    }
  });
  let timerInterval: any;
}