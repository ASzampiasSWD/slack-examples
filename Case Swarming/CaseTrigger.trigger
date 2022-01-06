/**
 * Created by Amanda on 1/4/2022.
 */

trigger CaseTrigger on Case (after insert, after update) {
    List<Case> newCases = trigger.new;
    System.debug(newCases);
    for (Case case1 : newCases) {
        if (case1.Priority == 'High') {
            System.debug('SlackController CRITICAL!!');
            System.debug(case1);
            SlackController.makeChannel(case1.CaseNumber);
        }
    }
}