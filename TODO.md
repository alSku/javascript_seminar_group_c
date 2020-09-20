# use case:
1. teacher1 schedules meeting with other teacher2  
2. teacher1 requests meeting (meeting type, date, participants)  
3. teacher2 accepts/refuses meeting 
4. when accept: 
5. *send email* to all participants containing information regarding the meeting

→ first problem for me: *send email* → already implemented by backend? yes

```c#
enum MeetingType  
{
    OneOnOne,
    WholeClass
}
```

# questions:
- do teachers have access to the 1-1 rooms?
- 100 ppl is quite a lot... bandwidth?
- we use credentials but should prevent ppl from joining? proxy login?
- how many classes can every teacher have? (backend)

# questions for Fazail:
- we need deps of (back-) and frontend team, so working in own repo is annoying...
- bbb alternatives? 
- if bbb do we need to provide bbb integration for games group? (maintainability?)
- writing our own webrtc is infeasible 

- so we need to write our own backend microservice? and our own backend for testing?
- do we need to write our own frontend? styling issues, modularity, ... 

- npm packages with own deps? example: mail service? 
- who is responsible for the integration of repos? 

<div style="display:flex; justify-content:center;" >
    <img width="75%" height="75%" src="https://raw.githubusercontent.com/alSku/javascript_seminar_group_c/master/docs/component_diag.svg" />
</div>
