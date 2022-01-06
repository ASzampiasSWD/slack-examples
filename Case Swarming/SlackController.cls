/**
 * Created by Amanda on 1/4/2022.
 */

public with sharing class SlackController {
    @future(callout=true)
    public static void makeChannel(String channelName) {
        System.debug('were in makeChannel gator');
        Slack_Admin_Setting__mdt slackUsers = getSlackUsers();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://hooks.slack.com/services/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');
        req.setMethod('POST');
        req.setHeader('Content-type', 'application/json');

        Case case1 = [SELECT Id, Priority, CaseNumber, Description, Date_Reported__c
        FROM Case WHERE CaseNumber =: channelName];

        String body = '{"text": "CREATE_CHANNEL:' + channelName + ':' + slackUsers.Slack_Users__c  + ':' + case1.Description + '"}';
        req.setBody(body);
        Http http = new Http();
        HTTPResponse res = http.send(req);
        System.debug(res);
    }

    private static Slack_Admin_Setting__mdt getSlackUsers() {
        Slack_Admin_Setting__mdt slackUsers = [SELECT Slack_Users__c
                                                FROM Slack_Admin_Setting__mdt
                                                LIMIT 1];
        return slackUsers;
    }
}