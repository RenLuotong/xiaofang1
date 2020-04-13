import React, { Component } from "react";
import holes from "../components/yanggguJson";
const AMap = window.AMap;
// console.log('amap',window.AMap)
const shuiyuan =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAARCAYAAADtyJ2fAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVBMDAyMjBGNzMxNTExRUE4RDlGRkM4QkM3ODUzMEYxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVBMDAyMjEwNzMxNTExRUE4RDlGRkM4QkM3ODUzMEYxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUEwMDIyMEQ3MzE1MTFFQThEOUZGQzhCQzc4NTMwRjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUEwMDIyMEU3MzE1MTFFQThEOUZGQzhCQzc4NTMwRjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5k7X+LAAACnklEQVR42lRTXUtUURRd+1x1dHTMZvwoCDMN+lbCoij7FDEpkrIgzECjIhTCrN6C8AcURL1FEL1ET2Iv0kuUUUSBmUwPZpmZljrOHec641czZ3fOnXFuHdhw7rlnrb322vsQ+/thL46Bs3MhPbl7jVDwMMKhrWB1nuf1y5XeFyJivUEkAgjDvk42UEpwQZEPVughPX9Wj4E+sDkNggC8PqB8O1B7vJtz887TdMCEEAqoLsmCQp/4OdKHO53Fsv8DyFcEcueASVFHLSA0ASqvAq7dHOE1ays1mHhkCJiff41bHVU8OAAq3aRkK41ShUqo1RIR5NdBiM0VQOftXmRmHhDszqlGT1eVHHifAMVlCmTXImETifUbIT+9A3q69yvMQQFz+iQ+q0z5q9R/TviUBEGDlvesPnyrAf9HUCjYIGjWKoY1A8rKVuyJTARdHDlgSbZkkeWGvgsrXCKQ4QqrAP+JO+w2IClXaAJOkMVjgJEBpLuiQjnai5JS5dyUSiL+By3vNVQZxGYAWFemWlf4SpAQT7CvZo7dHmBhweZ2JCbBhjqLRsAeL1Bz1FIcjwWFzFnesbtdHGsA/xjS3jv1iWTopGPfIU43QlbsbIZpRgVicc32gM+0vKTyXeCxUbDhZGU1Yjw6DNpTDW5oeiqsYJdmEnaGGeWUZ0U92joicLmAsKnAKpWOgKrLmw9cvjqO9PSziERtw2wLyDBAU7+t+LbKWtF6HRwMgJYW1UQtKDVhUNsNyLINR2hyMm4bKHUFwmmyMfXrraw70S6aLkF+6Ycc9oOaW8GH6lpoYtyfaE1ipaWc04YsLumpuMuNF7aI4W8XtVR56tx9CgYekfaCHCCl3mOq8eqJZaspisfu6RlkI+0Kzc1BP6V/118BBgDAyhx5Ec0r6QAAAABJRU5ErkJggg==";
const xiaofangche =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU5M0Y2NjQzNzMxNTExRUFCNkVFRjk5M0YyODc0ODI0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU5M0Y2NjQ0NzMxNTExRUFCNkVFRjk5M0YyODc0ODI0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTkzRjY2NDE3MzE1MTFFQUI2RUVGOTkzRjI4NzQ4MjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTkzRjY2NDI3MzE1MTFFQUI2RUVGOTkzRjI4NzQ4MjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7eCpybAAAAo0lEQVR42mL4//8/AxQzAnEMEK8G4mdQvBoqxghTB2YAgTiQ9+L3pg0MP3ftYvhx+DhIjIHD1pKB3c2NgdUvgIGBkVECKPQSYvK/f/9/TOj//4xBECsGyYHUgNSCNMT82rAOp2IYBqkBqWUCWuMPcgYhAFXjD9JgDXMzPgBVY83EQCIAaTgKCg1CAKrmKEjDRlDQEQJQNRtJDlayIo6kpAEQYAAdAtxHnS0i1AAAAABJRU5ErkJggg==";
const xiaofangdui =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBBREE1RjQ5Nzk2MDExRUE5NTJBOUExRjZGRkJENkU4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBBREE1RjRBNzk2MDExRUE5NTJBOUExRjZGRkJENkU4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEFEQTVGNDc3OTYwMTFFQTk1MkE5QTFGNkZGQkQ2RTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEFEQTVGNDg3OTYwMTFFQTk1MkE5QTFGNkZGQkQ2RTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5LEhUxAAAAyElEQVR42mL8f4YBF8iH0hOxSTLi0MgNxPeA+D8QKwHxN3QFTDhsywZiMSAWB+IsYm3kgdomCuW/gtr6FVkRCxB7ALEWEKtAsQaSJgaozdeB+AYQ34HiKyAbZwEZqQykgZkgP6YD8SQSNE0A4kwmaMiBgr6VCE3NQFwI0oMeOIeB2AaHJpCcHa7okMNjmzyueORH0/gPimFAFoh5sWnURdKwGoh1gFgPygaFAyNUDEOjMhBvBGJDIA6Dxt1VKBsktgmaEMAAIMAAfYgqwhS3NNwAAAAASUVORK5CYII=";
const yiranyibao =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJGNzNENzFGNzMxRjExRUFBRjJBOUQ5OEMyMDZEMThDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJGNzNENzIwNzMxRjExRUFBRjJBOUQ5OEMyMDZEMThDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkY3M0Q3MUQ3MzFGMTFFQUFGMkE5RDk4QzIwNkQxOEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkY3M0Q3MUU3MzFGMTFFQUFGMkE5RDk4QzIwNkQxOEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz734ofJAAABLElEQVR42mL8//8/AxzcZAkEkn5AbAPEP4H4MBCvZVD/swemhBGu4SbLQiAZx4AdzANqSgazQBr+32CeB8T/v15Q+19UPvu/ov3p/1ouR//XN0z8/+Oy3H+QHBAXgw0HMtRAAt8vy//Xdj/yn0HhAQoOiF8P03ABpIEJaIktyKalh+IZrt6UwXDLhoOGDMduRIGY+kBnW4M0GIB4F+7LM+AClx6qwJh6IA2PQCxZkbc4NUgLweWegjQcAbHiHDYwcPB9w1CsoviCwd1wDYx7GBZKm0EeO7UlChw6MA/bBu36f/+QK8zTc0BqIfFwkwXk2/VAbAK2960NAyvLTwYx/tMwk7cDsT8wLn4zosX0dGioaUNFQM49BFRYjRnTyOAmizSQ/ANU+BJdCiDAAH6CnUSqTcEzAAAAAElFTkSuQmCC";
const gujianzhu =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE4MjAyRkYzNzMxRTExRUE4MkEzQzFCQTE0RThFNjcyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE4MjAyRkY0NzMxRTExRUE4MkEzQzFCQTE0RThFNjcyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTgyMDJGRjE3MzFFMTFFQTgyQTNDMUJBMTRFOEU2NzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTgyMDJGRjI3MzFFMTFFQTgyQTNDMUJBMTRFOEU2NzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7RpgRBAAABZElEQVR42mL4//8/AxJWB+IJQHwLiF9D6X4gVkNWh6yhBYjf/j847//fdtf/f8vkwfT/g/P/g8Uh8mC1jGCdDAwdDL9/lP+r02L4c+s+AzpgVldiYG66zsDAwtYB5FaCNCkBGef/lArz/bv3jgEXYFKSYGDpfv4RyNRnAhKZDEcW49UAAv/uvWBgOLqUH6QepCny755JDMSAf3sng6hokCbe/x8uEafpzUkQxQ/S9IlJUJ8oTYwCBiDqC0jTaibHbKI0MbsXg6gloNBTBTKu/k5lZP2PJyyYJIEhPuX/dyBTG2TTbSCezlpxAq8tLLV3QNR0IL7PBBXLZ1A2P8AaVIhVA1tCOwODuPIaIBPsPiYkuemM0X0fmFVlUf2hCwwk34pXUFsgAC3Btv3/8fn/z2iG/z+DgDgGKPTnNyjtNeBKsDA89f/NI///Nln8/3/7OEjDFHQ12DSBcBUQP4bSGPIAAQYA+7sZFxbFzOAAAAAASUVORK5CYII=";
const renyuanmiji =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIwNjM4QUQ4NzMxRTExRUFCOURCRUQ0MUY5QUE0Q0U3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIwNjM4QUQ5NzMxRTExRUFCOURCRUQ0MUY5QUE0Q0U3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjA2MzhBRDY3MzFFMTFFQUI5REJFRDQxRjlBQTRDRTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjA2MzhBRDc3MzFFMTFFQUI5REJFRDQxRjlBQTRDRTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7OpFesAAABz0lEQVR42oxSOyyDURT+fqrRVL0G8YpXpEGIYLAwGETndhIDogNmFovXYBBGEgvBJAQTYfKIMDDRH2moeCUGr9LG77bXufW3+dEfJ/nuPffe851z7nevdI0URLNMfm+kqUNdjt9IqUq0OAP0rUeZmuwVjrGlNZmm/mhBUrQOqLoFfv/zXVU1RUhI298F4k0J1MXr99gYnepdbzPTYPIVmOsSyuys2OvW7YAq2sgvIRSG4PPV31VWg51cf96zOJu62ANMpnVaulUcUkdrEufcFtjcWGFuN5jHA3Z2DkU+xfuB+0uluMpCGIutMBTkw5CXB4PVitia2gYhov1tdQWPQxP4zURCbdKknnaYa2rtoA4qeDDIX/v7OF3nX/ANDnDBISuH0ICcIsKYf2T4T7J/dEQQxwjW0AuKQU2SRdh6cNh1yQ8OhyBvEjLCvMgzkqJC8hzmudLVgXkuxZRLsbc/PhI9ZRJ/8T7eWnI10qsf9Z2p0THI9F4AZnMiJfF+/0hl/PgkQkzsbES6vIOMo+2QL8jgQQROQzGlEZZGg2ZlYZ4/O508eCyLu84R6lTMBWQXf3K2cWV5UZw1hXmRBOEkhCVCg3ZfPbMRlrVkgQ8BBgCRDzES7h6gCQAAAABJRU5ErkJggg==";
export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getmapObject(this);
    this.rendermap();
  }

  //生成地图
  rendermap = () => {
    let content = this.refs.container;
    let THIS = this;
    let map = new AMap.Map(content, {
      zoom: 10.5,
      center: [115.87873, 36.116541],
      pitch: 0,
      viewMode: "3D",
      //设置地图背景图
      // mapStyle: 'amap://styles/7f54d276820e7e6739bcf24f65dea8ee'
    });
    map.setMapStyle("amap://styles/584f421c9e96aa6d4e8dfb3d4464ecd3");
    THIS.markers = [];
    //map.setZoom(12.2); //设置地图层级
    if (holes) {
      // 外多边形坐标数组和内多边形坐标数组
      var outer = [
        new AMap.LngLat(-360, 90, true),
        new AMap.LngLat(-360, -90, true),
        new AMap.LngLat(360, -90, true),
        new AMap.LngLat(360, 90, true),
      ];
      var pathArray = [outer];
      pathArray.push.apply(pathArray, holes);
      var polygon = new AMap.Polygon({
        pathL: pathArray,
        //线条颜色，使用16进制颜色代码赋值。默认值为#006600
        strokeColor: "#0198f7",
        strokeWeight: 4,
        //轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
        strokeOpacity: 0.5,
        //多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
        fillColor: "rgba(11,22,89)",
        //多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
        fillOpacity: 0.9,
        //轮廓线样式，实线:solid，虚线:dashed
        strokeStyle: "solid",
        /*勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在    
                    ie9+浏览器有效 取值： 
                    实线：[0,0,0] 
                    虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
                    点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实 
                    线和10个像素的空白 （如此反复）组成的虚线*/
        strokeDasharray: [10, 2, 10],
      });
      polygon.setPath(pathArray);
      map.add(polygon);
      /*   var polyline = new AMap.Polyline({
               strokeColor: '#3366FF',   // 线颜色
               strokeOpacity: 1,         // 线透明度
               strokeWeight: 2,          // 线宽
               strokeStyle: 'solid',     // 线样式
               strokeDasharray: [10, 5], // 补充线样式
               geodesic: false            // 绘制大地线
           });
              polyline.setPath(pathArray);
              map.add(polyline);*/

      let { marker } = THIS.props;
      for (let i = 0; i < marker.length; i++) {
        const element = marker[i];
        for (let j = 0; j < element.data.length; j++) {
          var endMarker = new AMap.Marker({
            map: map,
            position: element.data[j],
            icon: THIS.renderIcon(element.mingcheng),
            offset: new AMap.Pixel(-13, -30),
            title: element.mingcheng,
          });
          THIS.markers.push(endMarker);
          // map.add([endMarker]);
          endMarker.on("click", (e) => {
            console.log(e);
          });
        }
      }
    }
    // new AMap.DistrictSearch({
    //   extensions: "all",
    //   subdistrict: 0,
    // }).search("阳谷县", function (status, result) {
    //   // 外多边形坐标数组和内多边形坐标数组
    //   var outer = [
    //     new AMap.LngLat(-360, 90, true),
    //     new AMap.LngLat(-360, -90, true),
    //     new AMap.LngLat(360, -90, true),
    //     new AMap.LngLat(360, 90, true),
    //   ];
    //   var holes = result.districtList[0].boundaries;
    //   console.log("yanggu", JSON.stringify(holes));
    //   var pathArray = [outer];
    //   pathArray.push.apply(pathArray, holes);
    //   var polygon = new AMap.Polygon({
    //     pathL: pathArray,
    //     //线条颜色，使用16进制颜色代码赋值。默认值为#006600
    //     strokeColor: "#0198f7",
    //     strokeWeight: 4,
    //     //轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
    //     strokeOpacity: 0.5,
    //     //多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
    //     fillColor: "rgba(11,22,89)",
    //     //多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
    //     fillOpacity: 0.9,
    //     //轮廓线样式，实线:solid，虚线:dashed
    //     strokeStyle: "solid",
    //     /*勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在    
    //           ie9+浏览器有效 取值： 
    //           实线：[0,0,0] 
    //           虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
    //           点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实 
    //           线和10个像素的空白 （如此反复）组成的虚线*/
    //     strokeDasharray: [10, 2, 10],
    //   });
    //   polygon.setPath(pathArray);
    //   map.add(polygon);
    //   /*   var polyline = new AMap.Polyline({
    //      strokeColor: '#3366FF',   // 线颜色
    //      strokeOpacity: 1,         // 线透明度
    //      strokeWeight: 2,          // 线宽
    //      strokeStyle: 'solid',     // 线样式
    //      strokeDasharray: [10, 5], // 补充线样式
    //      geodesic: false            // 绘制大地线
    //  });
    //     polyline.setPath(pathArray);
    //     map.add(polyline);*/

    //   let { marker } = THIS.props;
    //   for (let i = 0; i < marker.length; i++) {
    //     const element = marker[i];
    //     for (let j = 0; j < element.data.length; j++) {
    //       var endMarker = new AMap.Marker({
    //         map: map,
    //         position: element.data[j],
    //         icon: THIS.renderIcon(element.mingcheng),
    //         offset: new AMap.Pixel(-13, -30),
    //         title: element.mingcheng,
    //       });
    //       THIS.markers.push(endMarker);
    //       // map.add([endMarker]);
    //       endMarker.on("click", (e) => {
    //         console.log(e);
    //       });
    //     }
    //   }
    // });
  };

  //标记图片
  renderIcon(mingcheng) {
    switch (mingcheng) {
      case "水源":
        return new AMap.Icon({
          size: new AMap.Size(12, 15),
          image: shuiyuan,
          imageSize: new AMap.Size(12, 15),
          // imageOffset: new AMap.Pixel(-95, -3),
        });
        break;
      case "乡镇消防队":
        return new AMap.Icon({
          size: new AMap.Size(15, 15),
          image: xiaofangdui,
          imageSize: new AMap.Size(15, 15),
          // imageOffset: new AMap.Pixel(-95, -3),
        });
        break;
      case "消防车":
        return new AMap.Icon({
          size: new AMap.Size(15, 15),
          image: xiaofangche,
          imageSize: new AMap.Size(15, 15),
          // imageOffset: new AMap.Pixel(-95, -3),
        });
        break;
      case "人员密集场所":
        return new AMap.Icon({
          size: new AMap.Size(15, 15),
          image: renyuanmiji,
          imageSize: new AMap.Size(15, 15),
          // imageOffset: new AMap.Pixel(-95, -3),
        });
        break;

      case "易燃易爆场所":
        return new AMap.Icon({
          size: new AMap.Size(15, 15),
          image: yiranyibao,
          imageSize: new AMap.Size(15, 15),
          // imageOffset: new AMap.Pixel(-95, -3),
        });
        break;

      case "古建筑":
        return new AMap.Icon({
          size: new AMap.Size(12, 15),
          image: gujianzhu,
          imageSize: new AMap.Size(12, 15),
          // imageOffset: new AMap.Pixel(-95, -3),
        });
        break;

      default:
        break;
    }
  }

  //显示隐藏标记
  markerhandle = (mingcheng) => {
    for (let i = 0; i < this.markers.length; i++) {
      const element = this.markers[i];
      if (mingcheng == element.w.title) {
        if (element.visible === true || element.visible === undefined) {
          element.visible = false;
          element.hide();
        } else if (element.visible === false) {
          element.visible = true;
          element.show();
        }
      }
    }
  };

  render() {
    return (
      <div
        style={{
          height: "55vh",
          margin: "0px 50px 20px 50px",
          border: "4px solid rgb(9,9,69)",
        }}
        ref="container"
      />
    );
  }
}
