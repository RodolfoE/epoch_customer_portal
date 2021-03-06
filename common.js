var stringifyPrimitive = function (v) {
  switch (typeof v) {
    case "string":
      return v;

    case "boolean":
      return v ? "true" : "false";

    case "number":
      return isFinite(v) ? v : "";

    default:
      return "";
  }
};

function querystring(obj, sep, eq, name) {
  sep = sep || "&";
  eq = eq || "=";
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === "object") {
    return Object.keys(obj)
      .map(function (k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (Array.isArray(obj[k])) {
          return obj[k]
            .map(function (v) {
              return ks + encodeURIComponent(stringifyPrimitive(v));
            })
            .join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      })
      .filter(Boolean)
      .join(sep);
  }

  if (!name) return "";
  return (
    encodeURIComponent(stringifyPrimitive(name)) +
    eq +
    encodeURIComponent(stringifyPrimitive(obj))
  );
}

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function decodeUri(qs, sep, eq, options) {
  sep = sep || "&";
  eq = eq || "=";
  var obj = {};

  if (typeof qs !== "string" || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === "number") {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, "%20"),
      idx = x.indexOf(eq),
      kstr,
      vstr,
      k,
      v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = "";
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
}


/**
 * To get the authorization code locally, use the following url
 * http://localhost:3002/api/auth/oidc/auth
 * To get in dev environment, use
 * https://dev.portal.my.sms-group.com/security/api/auth/oidc/auth
 */
 const getToken = async () => {
    try {
      const queryString = window.location.hash;
      const { code } = decodeUri(
        queryString.substring(1, queryString.length - 1)
      );
      var postData = querystring({
        grant_type: "authorization_code",
        code,
        client_id: "1",
        client_secret:
          "2xWMUibc_PoCAtFxqRu8Qs1bXXZRC-XdXPhHlm-xjuabmoHtm8kFUC9d-B1H9Ur6sgjWi1jXlwDxUDO-dBUCeQ",
        redirect_uri: "http://localhost:8083",
      });
      const dataSubmit = await fetch(
        `http://localhost:8080/security/api/auth/oidc/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": postData.length,
            Cookie:
              "@sms:token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbkB2ZXR0YS5kaWdpdGFsIiwiZmlyc3RfbmFtZSI6IlBsYXRmb3JtIiwibGFzdF9uYW1lIjoiQWRtaW5pc3RyYXRvciIsImlzX2FkbWluIjp0cnVlLCJlbWFpbCI6bnVsbCwic3RhdHVzIjoiQUNUSVZFIiwic2VjdXJpdHkiOnt9LCJpYXQiOjE2NTEwNjc3MzAsImV4cCI6MTY2MDA2NzczMH0.2XjpasespZ-PnDUKmzymm41jVaW7YaXKkBQ75v0WI2U",
          },
          body: postData,
        }
      );
      console.log(dataSubmit);
      const result = await dataSubmit.json();
      return result;
    } catch (err) {
      throw err;
    }
  };

  
const getMe = async (access_token) => {
    try{
        const dataSubmit = await fetchNode(`http://localhost:8080/security/api/auth/oidc/me?access_token=${access_token}`, 
        {
            "method": "GET"
        });
        console.log(dataSubmit);
        const result = await dataSubmit.json();
        console.log(result);
    }
    catch (err){
        console.log(err);
    }
}