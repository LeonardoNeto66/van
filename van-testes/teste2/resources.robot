*** Settings ***
Documentation    
Library    SeleniumLibrary

*** Variables ***
${URL}                    http://localhost:4200/
${TEXTO_PAG_INICIAL}      //h1[@class='title'][contains(.,'Bem-vindo')]
${GERENCIAR_VANS}                //a[@class='btn btn-cta'][contains(.,'Gerenciar Vans')]
${TEXTO_PAG_VANS}         //h1[contains(.,'Cadastrar Van')]
${TEXT_VANS_CADASTRADAS}  //h3[contains(.,'Vans cadastradas')]
${BUTTON_EXCLUIR}          //button[@type='button'][contains(.,'Excluir')]
${NENHUMA_VAN_CADASTRADA}  //td[@colspan='4'][contains(.,'Nenhuma van cadastrada.')]

*** Keywords ***
Abrir navegador para remover van
    Open Browser    ${URL}    browser=firefox
    Maximize Browser Window

Fechar navegador
    Capture Page Screenshot    
    Close Browser

Acessar página de vans
    [Documentation]    
    Go To    ${URL}
    Wait Until Page Contains Element    ${TEXTO_PAG_INICIAL}    timeout=10s
    Click Element    ${GERENCIAR_VANS}
    Wait Until Page Contains Element    ${TEXTO_PAG_VANS}    timeout=10s
    Scroll Element Into View    ${TEXT_VANS_CADASTRADAS}

Clicar em remover van
    [Documentation]   
    Click Button    ${BUTTON_EXCLUIR}

 

