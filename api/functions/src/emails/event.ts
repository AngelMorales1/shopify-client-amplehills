export type EventEmailConfig = {
  id: string;
  title: string;
  datetime: string;
  directionsLink: string;
  calendarLink: string;
}

export const compose = (config: EventEmailConfig): string => `
  <html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>You're Going to ${config.title}</title>
    
    <style>
      body {
        background: #fff;
      }

      body, p {
        color: #13436d;
      }

      p {
        font-family: Helvetica, arial, sans-serif;
        font-size: 16px;
        line-height: 22px;
        margin-bottom: .5rem;
      }

      a {
        color: #13436d;
        text-decoration: underline;
      }

      strong {
        font-weight: bold;
      }
    </style>
  </head>

  <body>
    <table width="600px" style="margin: auto;">
      <tr width="600px">
        <td width="600px">
          <div width="600px" style="text-align: center; padding: 20px">
            <strong>Confirmation #${config.id}</strong>
          </div>
        </td>
      </tr>
      <tr width="600px">
        <td width="600px">
          <div style="background: url('https://cdn.sanity.io/images/1v8tcmfe/production/0c5e045c2475cec9f82ffeef02547b641fef0801-1000x1554.png?fit=max&w=1200&h=1200'); background-size: cover; background-position: center center; background-repeat: no-repeat; width: 600px; height: 934px; overflow: auto;" >
            <div style="border: dotted #fe5c60 5px; width: 300px; ${config.title.length > 21 ? 'padding: 25px; height: 300px;' : 'padding: 50px 25px; height: 250px;'} margin-top: 292px; margin-left: 120px; text-align: center; background: #fff;">
              <p style="margin-bottom: 30px"><img width="126px" height="18px" src="https://cdn.sanity.io/images/1v8tcmfe/production/a79b40c5f852f58afb96e8ffdce5972c67451320-275x39.png?fit=max&w=1200&h=1200" alt="You're going to:" /></p>
              <p style="${config.title.length > 21 ? 'font-size: 24px; line-height: 29px;' : 'font-size: 30px; line-height: 35px;'}">
                <strong>${config.title}</strong>
              </p>
              <p style="font-size: 12px; color: #fe5c60;"><strong>${config.datetime}</strong></p>

              <p style="margin-top: 45px;">
                <strong>
                  <a style="letter-spacing: .5px; font-size: 14px; background: #13436d; border-radius: 30px; text-decoration: none; height: 40px; width: 150px; padding: 12px 32px; color: #fff;" href="${config.directionsLink}">
                    Get Directions
                  </a>
                </strong>
              </p>

              <p style="margin-top: 18px;">
                <a style="color: #13436d; font-size: 12px;" href="${config.calendarLink}">Add to Calendar</a>
              </p>
            </div>
          </div>
        </td>
      </tr>
      <tr>
      </tr>
      <tr width="600px">
        <td width="600px">
          <table width="600px" style="padding-top: 32px">
            <tr width="600px">
              <td width="150px" style="text-align: center; font-size: 12px;"><a style="color: #13436d;" href="https://www.amplehills.com/events">Events</a></td>
              <td width="150px" style="text-align: center; font-size: 12px;"><a style="color: #13436d;" href="https://www.amplehills.com/contact-us">Contact Us</a></td>
              <td width="150px" style="text-align: center; font-size: 12px;"><a style="color: #13436d;" href="https://www.amplehills.com/locations">Locations</a></td>
              <td width="150px" style="text-align: center; font-size: 12px;"><a style="color: #13436d;" href="https://www.amplehills.com/privacy-policy">Privacy Policy</a></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

export default compose;
