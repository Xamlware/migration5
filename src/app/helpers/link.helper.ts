import * as moment from "moment";
import { VerifyLink } from '../interfaces/verifyLink';
import { VerifyAdmin } from '../interfaces/verifyAdmin';
import { ReverseString } from '../helpers/string.helper';
import { Guid } from '../helpers/math.helper';

export class LinkHelper {
  static guid = Guid.MakeNew().ToString();

  //  public static string EncryptAdminLink(string link, string ai)
  //         {
  //             var token = "";
  //             //var adminId: string = "9962107f-7a3c-4e78-af5f-3f7883506769"
  //             //var g = Guid.MakeNew().ToString();
  //             //"Ketor~~~" + link + "~~~"+ Test123 + "~~~" + jbard@ketogeniq.com + "/"
  //             var guid = "8A8F29AE-62E0-4636-CE25-0600F8BFCEF7";
  //             guid = guid.Replace(" ", "");

  //             var e = link.Replace("/", "").Split("~~~".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
  //             var curDate = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss");
  //             var date = curDate.Substring(0, curDate.IndexOf(" "));
  //             var time = curDate.Substring(curDate.IndexOf(" ")).Trim();
  //             var d = date.Split('/');
  //             var t = time.Split(':');

  //             //var curTime = moment(new Date()).format("HH:mm");
  //             var a = ai.Split('-');
  //             var g = guid.Split('-');
  //             //var time = curTime.Split(":".ToCharArray());
  //            // var d = curDate.Split("/".ToCharArray());


  //             var st = "";
  //             var sd = "";
  //             var sl = "";
  //             var len = 0;
  //             var lenStr = "";
  //             token = token + (e.Length.ToString().Length < 2 ? "0" : "") + e.Length.ToString();
  //             token = token + g[0];
  //             token = token + t[0];
  //             token = token + a[4];
  //             token = token + d[0];

  //             lenStr = e[0].Length.ToString("X");
  //             if (lenStr.Length < 2)
  //             {
  //                 lenStr = "0" + lenStr;
  //             }
  //             token = token + lenStr;
  //             token = token + EncryptString(e[0]);

  //             token = token + g[1];
  //             token = token + t[1];
  //             token = token + a[3];
  //             token = token + d[1];

  //             if (e.Length > 1)
  //             {
  //                 lenStr = e[1].Length.ToString("X");
  //                 if (lenStr.Length < 2)
  //                 {
  //                     lenStr = "0" + lenStr;
  //                 }
  //                 token = token + lenStr;
  //                 token = token + EncryptString(e[1]);
  //             }

  //             token = token + g[2];
  //             token = token + t[2];
  //             token = token + a[2];
  //             token = token + ReverseString(d[2]);
  //             if (e.Length > 2)
  //             {
  //                 lenStr = e[2].Length.ToString("X");
  //                 if (lenStr.Length < 2)
  //                 {
  //                     lenStr = "0" + lenStr;
  //                 }
  //                 token = token + lenStr;
  //                 token = token + EncryptString(e[2]);
  //             }

  //             token = token + g[3];
  //             token = token + a[1];
  //             if (e.Length > 3)
  //             {
  //                 lenStr = e[3].Length.ToString("X");
  //                 if (lenStr.Length < 2)
  //                 {
  //                     lenStr = "0" + lenStr;
  //                 }
  //                 token = token + lenStr;
  //                 token = token + EncryptString(e[3]);
  //             }

  //             token = token + g[4];
  //             token = token + a[0];
  //             if (e.Length > 4)
  //             {
  //                 lenStr =e[4].Length.ToString("X");
  //                 if (lenStr.Length < 2)
  //                 {
  //                     lenStr = "0" + lenStr;
  //                 }
  //                 token = token + lenStr;
  //                 token = token + EncryptString(e[4]);
  //             }

  //             return token.ToUpper();
  //         }

  public static encryptAdminLink(link: string, ai: string, encrypt: boolean = false): string {
    {
      var token = "";
      //var adminId: string = "9962107f-7a3c-4e78-af5f-3f7883506769"
      //var g = Guid.MakeNew().ToString();
      console.log(this.guid);
      //"Ketor~~~" + link + "~~~"+ Test123 + "~~~" + jbard@ketogeniq.com + "/"
      //this.guid = "8A8F29AE-62E0-4636-CE25-0600F8BFCEF7"

      var e = link.replace('/', '').split('~~~');
      var curDate = moment(new Date()).format("MM/DD/YYYY");
      var curTime = moment(new Date()).format("HH:mm:ss");
      var a = ai.split('-');
      var g = this.guid.split('-');
      var time = curTime.split(":");
      var d = curDate.split('/');

      console.log(link);
      console.log(curDate);
      console.log(curTime);

      var st = "";
      var sd = "";
      var sl = "";
      var len = 0;
      var lenStr = "";
      token = token + (e.length.toString().length < 2 ? "0" : "") + e.length.toString();
      token = token + g[0];
      token = token + time[0];
      token = token + a[4];
      token = token + d[0];

      lenStr = e[0].length.toString(16);
      if (lenStr.length < 2) {
        lenStr = "0" + lenStr;
      }
      token = token + lenStr;
      token = token + this.encryptString(e[0]);

      token = token + g[1];
      token = token + time[1];
      token = token + a[3];
      token = token + d[1];

      if (e.length > 1) {
        lenStr = e[1].length.toString(16);
        if (lenStr.length < 2) {
          lenStr = "0" + lenStr;
        }
        token = token + lenStr;
        if (e[0] === "Ketove") {
          token = "21" + token;
          token = token + e[1];
        } else {
          token = "00" + token;
          token = token + this.encryptString(e[1]);
        }
      }

      token = token + g[2];
      token = token + time[2];
      token = token + a[2];
      token = token + ReverseString(d[2]);
      if (e.length > 2) {
        lenStr = e[2].length.toString(16);
        if (lenStr.length < 2) {
          lenStr = "0" + lenStr;
        }
        token = token + lenStr;
        token = token + this.encryptString(e[2]);
      }

      token = token + g[3];
      token = token + a[1];
      if (e.length > 3) {
        lenStr = e[3].length.toString(16);
        if (lenStr.length < 2) {
          lenStr = "0" + lenStr;
        }
        token = token + lenStr;
        token = token + this.encryptString(e[3]);
      }

      token = token + g[4];
      token = token + a[0];
      if (e.length > 4) {
        lenStr = e[4].length.toString(16);
        if (lenStr.length < 2) {
          lenStr = "0" + lenStr;
        }
        token = token + lenStr;
        token = token + this.encryptString(e[4]);
      }
    }

    return token.toUpperCase();
  }

  public static decryptAdminLink(token: string) {
    console.log("token = ", token);
    //admin guid = "9962107f-7a3c-4e78-af5f-3f7883506769"
    // new guid =   8A8F29AE-62E0-4636-CE25-0600F8BFCEF7"
    // "          1          2         3         4         5         6         7         8         9         0         1         2         3         4         5         6"
    // "012345678901234567892012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890" 
    //var token = "048A8F29AE073F788350676909057D33A63DA462E024AF5F14049E37A03946364E78078633A542630065CE257A3C149C309337A43272399742A135973C9B3F6031A13B0600F8BFCEF79962107F"
    //           04 8A8F29AE 3F7883506769 09 05 7D33A63DA4 62E0 00 AF5F 13 04 9E37A039 4636 4E78 07 8633A542630065 CE25 7A3C 149C309337A432 14 9C309337A43272399742A135973C9B3F6031A13B 0600F8BFCEF7 9962107F
    //8-4-4-4-12
    var curDate = "";
    var curTime = "";
    var a = [];
    var admin = "";
    var g = "";
    var len = 0;
    var newLen = 0;
    var i = 0;
    var l = [];
    var linkCount = parseInt(token.substr(0, 2));
    var link = "";
    var link2 = "";
    var link3 = "";
    var link4 = "";
    //var link: string = "";

    g = g + token.substr(2, 8) + "-";
    curTime = curTime + token.substr(10, 2);
    a.push(token.substr(12, 12));

    curDate = curDate + token.substr(24, 2);
    len = parseInt(token.substr(26, 2));
    var link = this.decryptString(token.substr(28, len * 2));
    //l.push(link);
    len = 28 + (len * 2);

    g = g + token.substr(len, 4) + "-";
    len = len + 4;
    curTime = curTime + token.substr(len, 2);
    len = len + 2;
    a.push(token.substr(len, 4));
    len = len + 4;
    curDate = curDate + token.substr(len, 2);
    len = len + 2;

    if (linkCount > 1) {
      newLen = parseInt(token.substr(len, 2));
      len = len + 2;
      var link2 = this.decryptString(token.substr(len, newLen * 2));
      //      l.push(link3);
      len = (newLen * 2) + len;
    }

    //var link2 = this.decryptString(token.substr(len, newLen * 2));
    //  l.push(link2);
    len = (newLen * 2) + len;

    g = g + token.substr(len, 4) + "-";
    len = len + 4;
    a.push(token.substr(len, 4));
    len = len + 4;

    curDate = curDate + ReverseString(token.substr(len, 4));
    len += 4;

    if (linkCount > 2) {
      newLen = parseInt(token.substr(len, 2));
      len = len + 2;
      var link3 = this.decryptString(token.substr(len, newLen * 2));
      //      l.push(link3);
      len = (newLen * 2) + len;
    }

    g = g + token.substr(len, 4) + "-";
    len = len + 4;
    a.push(token.substr(len, 4));
    len = len + 4;


    if (linkCount > 3) {
      newLen = parseInt(token.substr(len, 2), 16);
      len = len + 2;
      var link4 = this.decryptString(token.substr(len, newLen * 2));
      //      l.push(link4);
      len = (newLen * 2) + len;
    }

    g = g + token.substr(len, 12);
    len = len + 12;
    a.push(token.substr(len, 8));

    admin = a[4] + "-" + a[3] + "-" + a[2] + "-" + a[1] + "-" + a[0];
    // var lll = link + "-" + link2 + "-" + link3 + "-" + link4;

    // var taskStr: string = "";

    // for (var i = 0; i < l.length; i++) {
    //   var task: string = l[i];
    //   var str: string = (taskStr.length === 0 ? task : ("-" + task));
    //   taskStr = taskStr + str;
    // }
    // taskStr = taskStr + "/";

    console.log("a: ", admin)
    console.log("g: ", g)
    console.log("l: ", link)
    console.log("d: ", curDate)
    console.log("t: ", curTime)

    return new VerifyAdmin(admin, g, curTime, curDate, link, link2, link3, link4);
  }

  public static decryptString(s: string): string {
    var retVal = "";
    var start = 0
    var num = 0;

    for (var i = 0; i < s.length; i++) {
      var c = s.substr(start, 2);

      num = parseInt(c, 16);
      num = (i % 2 === 0 ? num - 43 : num + 43)
      retVal = retVal + String.fromCharCode(num);
      start = start + 2;
    }

    return retVal;
  }

  // public static string EncryptString(string s, bool b = false)
  //         {
  //             var l = s.Length;
  //             var retVal = "";
  //             for (var i = 0; i < s.Length; i++)
  //             {
  //                 var num = (int)s[i];

  //                 num = (i % 2 == 0 ? num + 43 : num - 43);
  //                 var h = num.ToString("X");
  //                 var c = (char)num;
  //                 if (h.Length < 2)
  //                 {
  //                     h = "0" + h;
  //                 }
  //                 retVal = retVal + h;
  //             }

  //             return retVal;
  //         }

  //         public static string DecryptString(string s)
  //         {
  //             var l = s.Length / 2;
  //             var retVal = "";
  //             var start = 0;
  //             for (var i = 0; i < l; i++)
  //             {
  //                 var c = s.Substring(start, 2);
  //                 var n = Convert.ToInt32(c, 16);
  //                 var num = n;

  //                 num = (i % 2 == 0 ? num - 43 : num + 43);
  //                 retVal = retVal + (char)num;
  //                 start = start + 2;
  //             }

  //             return retVal;
  //         }
  public static encryptString(s: string, b: boolean = false): string {
    var l = s.length;
    var retVal = "";
    for (var i = 0; i < s.length; i++) {
      var num = s.charCodeAt(i);

      num = (i % 2 === 0 ? num + 43 : num - 43)
      var h = num.toString(16);
      if (h.length < 2) {
        h = "0" + h;
      }

      retVal = retVal + h
    }

    return retVal;
  }

  public static decryptLink(link: string): VerifyLink {
    var ss: string;
    var sd: string;
    var st: string;


    var l1 = parseInt(link.substr(0, 2));
    var e1 = link.substr(2, l1 * 2);
    var emal = this.decryptEmalPart(e1);

    var hex2 = link.substr(l1 * 2 + 2, 2);
    var l2 = parseInt(hex2, 16);
    var e2 = link.substr(l1 * 2 + 4, l2 * 2);
    var emal2 = this.decryptEmalPart(e2);
    link = link.substr(l1 * 2 + l2 * 2 + 4);

    ss = link.substr(0, 8) + "-";
    sd = link.substr(8, 2);
    st = link.substr(10, 1);
    ss = ss + link.substr(11, 4) + "-";
    sd = sd + link.substr(15, 2);
    st = st + link.substr(17, 1);
    ss = ss + link.substr(18, 4) + "-";
    var sr = ReverseString(link.substr(22, 4));
    sd = sd + sr;
    st = st + link.substr(26, 1);
    ss = ss + link.substr(27, 4) + "-";
    st = st + link.substr(31, 1);
    ss = ss + link.substr(32);

    var emal: string = emal + "@" + emal2;

    return new VerifyLink(st, ss, sd, emal);
  }

  private static decryptEmalPart(e1: string): string {
    if (e1.length % 2 == 0) {
      var start = -2;
      var s: string = "";

      while (start < e1.length - 2) {
        start = start + 2;
        var p = e1.substr(start, 2);
        var i = parseInt(p, 16);
        var chr = String.fromCharCode(i);
        s = s + chr;
      }
    }

    return s;
  }
}

// var greeter = new decryptAdminLink();
// document.body.innerHTML = greeter.decrypt();